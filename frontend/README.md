# Frontend (static)

Este frontend viene del .zip que compartiste. Lo organicé así:
- `public/index.html`
- `src/js/script.js`
- `src/styles/style.css`
- `src/assets/*`

## Correr en local (rápido)
Desde `frontend/`:

```bash
python -m http.server 5173
```

Luego abre `http://localhost:5173/public/` (o sirve `public` con: `cd public && python -m http.server 5173`)

## Conectar al backend
En `src/js/script.js` puedes hacer `fetch("http://localhost:8000/api/...")`.
