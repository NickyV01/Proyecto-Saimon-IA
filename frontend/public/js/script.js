const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatContent = document.getElementById('chatContent');

const API_URL = 'http://localhost:8000/api/chat';

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Crear mensaje de usuario
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user-msg';
    userDiv.innerHTML = `<p>${message}</p>`;
    chatContent.appendChild(userDiv);

    // Limpiar input
    userInput.value = "";

    // Auto-scroll al fondo
    chatContent.scrollTop = chatContent.scrollHeight;

     try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        const data = await res.json(); // { answer: "..." }
        console.log('data', data);

        // Simular respuesta de Saimon IA
    setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.className = 'msg ai-msg';
        aiDiv.innerHTML = `<p>${data.answer}</p>`;
        chatContent.appendChild(aiDiv);
        chatContent.scrollTop = chatContent.scrollHeight;
    }, 1000);

    } catch (err) {
        aiDiv.innerHTML = `<p>${err.message}</p>`;
    }

    
}

// Escuchar click
sendBtn.addEventListener('click', sendMessage);

// Escuchar tecla Enter
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Registro del Service Worker para que sea instalable
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("Service Worker registrado con éxito"))
    .catch(err => console.log("Fallo al registrar SW:", err));
}

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active'); // Pone o quita la clase 'active'
});

// Opcional: Cerrar el menú si tocas el chat
document.querySelector('.chat-main').addEventListener('click', () => {
    sidebar.classList.remove('active');
});

const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');

// Iconos SVG para intercambiar
const sunSVG = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

// Al cargar, aplicar preferencia guardada
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.innerHTML = sunSVG;
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Guardar preferencia y cambiar icono
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.innerHTML = isDark ? sunSVG : moonSVG;
});