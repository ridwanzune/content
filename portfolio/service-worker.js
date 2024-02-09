const CACHE_NAME = 'image-viewer-cache-v2';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    '/',
                    '/designs.html',
                    // Add paths to webp images here
                    'images2/1.webp',
                    'images2/2.webp',
                    'images2/3.webp',
                    'images2/4.webp',
                    'images2/5.webp',
                    'images2/6.webp',
                    'images2/7.webp',
                    'images2/8.webp',
                    'images2/9.webp',
                    'images2/10.webp',
                    'images2/11.webp',
                    'images2/12.webp',
                    // Add paths to other assets here if needed
                    'images2/buttons/2.png',
                    'images2/manifest.json',
                    'images2/main.js',
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
