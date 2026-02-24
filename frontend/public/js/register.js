const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const mensajeDiv = document.getElementById("mensaje");
const API_URL = window.APP_CONFIG.API_URL;

async function sendLogin() {
  const password = passwordInput.value.trim();
  const email = emailInput.value.trim();
  const fullName = fullNameInput.value.trim();

  console.log("email", email);
  console.log("password", password);

  mensajeDiv.textContent = "";
  mensajeDiv.style.display = "none";

  if (!fullName) {
    mostrarError("Por favor ingresa un nombre y apellido.");
    return;
  }

  if (!email) {
    mostrarError("Por favor ingresa un correo electrónico.");
    return;
  }

  if (!validarEmail(email)) {
    mostrarError("El correo electrónico no es válido.");
    return;
  }

  if (!/^(?=.*[A-Z]).{5,}$/.test(password)) {
    mostrarError(
      "La contraseña debe tener mínimo 5 caracteres y al menos una mayúscula.",
    );
    return;
  }

  if (!password) {
    mostrarError("Por favor ingresa una contraseña.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, password, email }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json(); // { answer: "..." }
    console.log("data", data);
  } catch (err) {
    mostrarError(err.message);
    return;
  }
}

function mostrarError(mensaje) {
  mensajeDiv.textContent = mensaje;
  mensajeDiv.style.display = "block";
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

sendBtn.addEventListener("click", sendLogin);

// Escuchar tecla Enter
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendLogin();
  }
});
