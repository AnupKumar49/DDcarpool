// public/service-worker.js

// Define a cache name for your PWA.
const cacheName = 'my-pwa-cache-v1';

// Define an array of files to cache.
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other static assets and pages you want to cache here.
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      // Cache the specified files during installation.
      return cache.addAll(filesToCache);
    })
  );
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached files if they exist; otherwise, fetch from the network.
      return response || fetch(event.request);
    })
  );
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // Remove any outdated caches.
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
