// service-worker.js

const CACHE_NAME = 'image-viewer-cache-v2';
const IMAGE_CACHE_NAME = 'image-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/buttons/2.png',
  '/manifest.json',
  // Include other resources you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('image-cache-')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const requestURL = new URL(request.url);

  // Cache images separately for better control
  if (requestURL.pathname.endsWith('.png') || requestURL.pathname.endsWith('.jpg')) {
    event.respondWith(handleImageRequest(request));
  } else {
    event.respondWith(
      caches.match(request).then((response) => response || fetch(request))
    );
  }
});

async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request.clone());

  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }

  return networkResponse;
}
