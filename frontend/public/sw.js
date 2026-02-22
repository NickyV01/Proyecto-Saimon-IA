const CACHE_NAME = 'saimon-v1';
const ASSETS = [
    './',
    './index.html',
    './styles/style.css',
    './js/script.js',
    './assets/Saimon.jpeg',
    './assets/LogoUNESR.jpg'
];

// Instalación: Guardar archivos esenciales en caché
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activación: Limpiar cachés antiguas
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    console.log('Saimon IA: Service Worker Activo');
});

// Estrategia de red: Intentar ir a internet, si falla, usar caché
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});