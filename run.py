import subprocess
import sys
import os

ROOT = os.path.dirname(os.path.abspath(__file__))

# Frontend
subprocess.Popen(
    [sys.executable, "-m", "http.server", "5173"],
    cwd=os.path.join(ROOT, "frontend", "public"),
)

# Backend
subprocess.Popen(
    [sys.executable, "-m", "uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
    cwd=os.path.join(ROOT, "backend"),
)

print("🚀 Frontend: http://localhost:5173")
print("🚀 Backend:  http://localhost:8000")
print("🧠 Docs:     http://localhost:8000/docs")

input("Presiona ENTER para detener ambos...")
