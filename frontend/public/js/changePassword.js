const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const API_URL = window.APP_CONFIG.API_URL;

async function sendChangePassword() {
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  mensajeDiv.textContent = "";
  mensajeDiv.style.display = "none";


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

  if (password !== confirmPassword) {
    mostrarError("Las contraseña no coinciden.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, confirmPassword }),
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

sendBtn.addEventListener("click", sendLogin);

// Escuchar tecla Enter
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendLogin();
  }
});

function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        element.classList.remove("fa-eye");
        element.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        element.classList.remove("fa-eye-slash");
        element.classList.add("fa-eye");
    }
}
