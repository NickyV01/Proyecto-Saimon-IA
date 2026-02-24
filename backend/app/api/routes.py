from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import generate_reply
from app.schemas.login import LoginRequest, LoginResponse
from app.schemas.register import RegisterRequest, RegisterResponse
from app.schemas.changePassword import ChangePasswordtRequest, ChangePasswordResponse

from app.services.login import login, register, changePassword



router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}

# Ejemplo: endpoint que llama funciones en services/
@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest):
    try:
        answer = generate_reply(payload.message)
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=LoginResponse)
def loginUser(payload: LoginRequest):
    try:
        data = login(payload)
        return LoginResponse(data=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/register", response_model=RegisterResponse)
def registerUser(payload: RegisterRequest):
    try:
        data = register(payload)
        return RegisterResponse(data=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.post("/change-password", response_model=ChangePasswordResponse)
def changePasswordUser(payload: ChangePasswordtRequest):
    try:
        data = changePassword(payload.message)
        return ChangePasswordResponse(data=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))