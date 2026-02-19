# Backend (FastAPI)

## Instalar
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/Mac: source .venv/bin/activate
pip install -e .
cp .env.example .env
```

## Correr
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Probar
- `GET http://localhost:8000/api/health`
- Swagger: `http://localhost:8000/docs`

### Patrón solicitado
- Rutas: `app/api/routes.py`
- Funciones llamadas: `app/services/chat_service.py`
