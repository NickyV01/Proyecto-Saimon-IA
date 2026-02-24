from pydantic import BaseModel, field_validator, model_validator
import re

PASSWORD_REGEX = r"^(?=.*[A-Z]).{5,}$"

class ChangePasswordtRequest(BaseModel):
    password: str
    confirmPassword: str

    @field_validator("password", "confirmPassword")
    def validate_required(cls, v):
        if not v or not v.strip():
            raise ValueError("Este campo es obligatorio.")
        return v

    @field_validator("password")
    def validate_password_format(cls, v):
        if not re.match(PASSWORD_REGEX, v):
            raise ValueError(
                "La contraseña debe tener mínimo 5 caracteres y al menos una mayúscula."
            )
        return v

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirmPassword:
            raise ValueError("Las contraseñas no coinciden.")
        return self


class ChangePasswordResponse(BaseModel):
    data: object