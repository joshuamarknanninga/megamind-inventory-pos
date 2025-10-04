self.addEventListener('install', (event:any) => {
    event.waitUntil((async()=>{
      const cache = await caches.open('megamind-v1');
      await cache.addAll(['/', '/index.html', '/manifest.webmanifest']);
    })());
    self.skipWaiting();
  });
  
  self.addEventListener('fetch', (event:any) => {
    event.respondWith((async()=>{
      try { return await fetch(event.request); }
      catch { const cache = await caches.open('megamind-v1'); const r = await cache.match('/'); return r ?? Response.error(); }
    })());
  });
  