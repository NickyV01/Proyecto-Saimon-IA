import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB7nJRPxknQrgsEKVY2hSZS0mone-FRYvo",
    authDomain: "saimonia.firebaseapp.com",
    projectId: "saimonia",
    storageBucket: "saimonia.firebasestorage.app",
    messagingSenderId: "381539754872",
    appId: "1:381539754872:web:51c78a86e79f033585de8d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referencias globales para que funcionen en todo el script
const chatContent = document.getElementById('chatContent');
const userInput = document.getElementById('userInput');
const API_URL = 'http://localhost:8000/api/chat';

// --- EL PORTERO ---
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        console.log("Acceso autorizado para:", user.email);
        
        // ACTIVAR EVENTOS (Esto arregla el bloqueo de los clics)
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }
        if (userInput) {
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }
    }
});

// --- FUNCIÓN DE ENVÍO ---
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Mostrar mensaje del usuario
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user-msg';
    userDiv.innerHTML = `<p>${message}</p>`;
    chatContent.appendChild(userDiv);

    userInput.value = "";
    chatContent.scrollTop = chatContent.scrollHeight;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();

        // 2. Respuesta de Saimon IA
        setTimeout(() => {
            const aiDiv = document.createElement('div');
            aiDiv.className = 'msg ai-msg';
            aiDiv.innerHTML = `<p>${data.answer}</p>`;
            chatContent.appendChild(aiDiv);
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 500);

    } catch (err) {
        console.error(err);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'msg ai-msg';
        errorDiv.innerHTML = `<p style="color:red">Error: No se pudo conectar con el cerebro de Saimon.</p>`;
        chatContent.appendChild(errorDiv);
    }
}

// LÓGICA PARA CERRAR SESIÓN
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
                    signOut(auth).then(() => {
                        window.location.href = "login.html";
                    }).catch((error) => {
                        console.error("Error al cerrar sesión:", error);
                    });
                }
                });
        }


// --- RESTO DE TU LÓGICA (Dark Mode, Sidebar, Video) ---
// (Copia aquí abajo todo el código que ya tenías de Dark Mode, Sidebar y Video)

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

// Efectos del vídeo de presentación de Saimon

const videoContainer = document.getElementById('videoContainer');
const saimonVideo = document.getElementById('saimonVideo');

// Crear overlay si no existe
let overlay = document.querySelector('.video-overlay');
if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    document.body.appendChild(overlay);
}

videoContainer.addEventListener('click', () => {
    if (!videoContainer.classList.contains('expanded')) {
        // Expandir
        videoContainer.classList.add('expanded');
        overlay.style.display = 'block';
        
        // Audio y Reinicio
        saimonVideo.muted = false;
        saimonVideo.currentTime = 0;
        saimonVideo.play();
    } else {
        cerrarVideo();
    }
});

overlay.addEventListener('click', cerrarVideo);

function cerrarVideo() {
    videoContainer.classList.remove('expanded');
    overlay.style.display = 'none';
    saimonVideo.muted = true;
}

// Cerrar video al presionar la tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        // Verificamos si el video está expandido antes de intentar cerrar
        if (videoContainer.classList.contains('expanded')) {
            cerrarVideo();
        }
    }
});
