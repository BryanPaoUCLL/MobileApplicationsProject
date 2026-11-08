const CACHE_NAME = 'lavish-gamers-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/login.html',
  '/overview.html',
  '/games.html',
  '/manifest.webmanifest',
  '/icons/icon-512.png',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(precacheApp());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request, url.pathname));
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse !== undefined) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
          const responseToCache = networkResponse.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        }

        return networkResponse;
      });
    }),
  );
});

async function handleNavigationRequest(request, pathname) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      void caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
    }

    return networkResponse;
  } catch {
    const cachedRequest = await caches.match(request);

    if (cachedRequest !== undefined) {
      return cachedRequest;
    }

    const routeFallbacks = {
      '/login': '/login.html',
      '/overview': '/overview.html',
      '/games': '/games.html',
    };
    const fallbackPath = routeFallbacks[pathname] ?? '/index.html';

    const fallbackResponse = await caches.match(fallbackPath);

    return fallbackResponse ?? Response.error();
  }
}

async function precacheApp() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(APP_SHELL);

  const indexResponse = await cache.match('/index.html');

  if (indexResponse !== undefined) {
    const html = await indexResponse.text();
    const referencedPaths = Array.from(
      html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g),
      (match) => match[1],
    ).filter((path) => path.startsWith('/_expo/') || path.startsWith('/assets/'));

    await Promise.all(Array.from(new Set(referencedPaths)).map((path) => cache.add(path)));
  }

  await self.skipWaiting();
}
