from pydantic import BaseModel, Field, field_validator
import re

EMAIL_REGEX = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
PASSWORD_REGEX = r"^(?=.*[A-Z]).{5,}$"

class RegisterRequest(BaseModel):
    email: str
    password: str
    fullName: str
    
    @field_validator("email", "password", "fullName")
    def validate_required(cls, v):
        if not v or not v.strip():
            raise ValueError("Este campo es obligatorio.")
        return v

    @field_validator("email")
    def validate_email(cls, v):
        if not re.match(EMAIL_REGEX, v):
            raise ValueError("El correo electrónico no es válido.")
        return v

    @field_validator("password")
    def validate_password(cls, v):
        if not re.match(PASSWORD_REGEX, v):
            raise ValueError(
                "La contraseña debe tener mínimo 5 caracteres y al menos una mayúscula."
            )
        return v
    
    @field_validator("fullName")
    def validate_fullname(cls, v):
        if not v or not v.strip():
            raise ValueError("El nombre y apellido es obligatorio.")
        return v.strip()
    
class RegisterResponse(BaseModel):
    data: object