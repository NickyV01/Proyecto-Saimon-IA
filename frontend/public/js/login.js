import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

let esModoRegistro = false;

window.onload = () => {
    const btnPrincipal = document.getElementById('btnPrincipal');
    const enlaceToggle = document.getElementById('enlaceToggle');
    const campoNombre = document.getElementById('nombre');
    const titulo = document.getElementById('titulo');
    const mensajeDiv = document.getElementById('mensaje');

    // Cambiar entre Login y Registro
    enlaceToggle.addEventListener('click', (e) => {
        e.preventDefault();
        esModoRegistro = !esModoRegistro;
        titulo.innerText = esModoRegistro ? "Crear Cuenta" : "Iniciar Sesión";
        btnPrincipal.innerText = esModoRegistro ? "Registrarse" : "Entrar";
        campoNombre.style.display = esModoRegistro ? "block" : "none";
        enlaceToggle.innerText = esModoRegistro ? "Ya tengo cuenta" : "Regístrate aquí";
    });

    // Acción del botón principal
    btnPrincipal.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            if (esModoRegistro) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("¡Cuenta creada! Ahora inicia sesión.");
                location.reload(); 
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                // ESTE ES EL SALTO A TU CHATBOT
                window.location.href = "index.html"; 
            }
        } catch (error) {
            mensajeDiv.innerText = "Error: " + error.message;
            mensajeDiv.style.color = "red";
        }
    });
};