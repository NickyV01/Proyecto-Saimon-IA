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
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('Error:', err));
  });
}
