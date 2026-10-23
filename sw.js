const CACHE_NAME = "bivouac-nzilo-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./features.css",
  "./script.js",
  "./features.js",
  "./photos.js",
  "./supabase-config.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith("bivouac-nzilo-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Ne pas mettre en cache les appels API externes ni la bibliothèque Supabase CDN.
  if (url.origin !== self.location.origin) return;
  // La page de modération n'est jamais mise en cache.
  if (url.pathname.endsWith("/admin.html")) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const isShellAsset = request.mode === "navigate" ||
          request.destination === "image" ||
          request.destination === "audio" ||
          /\.(css|js|webmanifest|mp3|m4a|ogg|wav)$/i.test(url.pathname);
        if (isShellAsset) await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      if (request.mode === "navigate") {
        return (await cache.match("./index.html")) || Response.error();
      }
      return Response.error();
    }
  })());
});
