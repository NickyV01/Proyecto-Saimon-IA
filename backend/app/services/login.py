from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User

async def login(data, db: AsyncSession):

    stmt = select(User).where(User.email == data.email)

    result = await db.execute(stmt)

    user = result.scalar_one_or_none()
    
    print("user", user)

    if not user:
        raise Exception("Usuario no encontrado")

    # # Aquí deberías validar contraseña hasheada
    # if user.password != data.password:
    #     raise Exception("Contraseña incorrecta")

    return {
        "id": user.id,
        "email": user.email
    }

def register(data: object):
    print("FUNCION register",data)

    return data


def changePassword(data: object):
    return data
