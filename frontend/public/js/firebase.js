import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB7nJRPxknQrgsEKVY2hSZS0mone-FRYvo",
  authDomain: "saimonia.firebaseapp.com",
  projectId: "saimonia",
  storageBucket: "saimonia.firebasestorage.app",
  messagingSenderId: "381539754872",
  appId: "1:381539754872:web:51c78a86e79f033585de8d",
  measurementId: "G-0REVMB0Y0R"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios para usarlos en otros archivos
export const auth = getAuth(app);
export const db = getFirestore(app);