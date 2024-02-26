const CACHE_NAME = 'image-viewer-cache-v2';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    // Add paths to webp images here
                    '/1.webp',
                    '/2.webp',
                    '/3.webp',
                    '/4.webp',
                    '/5.webp',
                    '/6.webp',
                    '/7.webp',
                    '/8.webp',
                    '/9.webp',
                    '/10.webp',
                    '/11.webp',
                    '/12.webp',
                    // Add paths to other assets here if needed
                    '/buttons/2.png',
                    '/manifest.json',
                    '/main.js',
                ]);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((name) => {
                        if (name !== CACHE_NAME) {
                            return caches.delete(name);
                        }
                    })
                );
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
