from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import generate_reply

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
