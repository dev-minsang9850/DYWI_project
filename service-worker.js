self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('pwa-cache-v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          '/icon-192x192.png',
          '/icon-512x512.png',
          'DYWI_WF_IF/IF_index.html',
          'DYWI_WF_IF/script.js',
          'DYWI_WF_IF/style.css',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  