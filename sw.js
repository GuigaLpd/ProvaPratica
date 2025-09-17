const CACHE_NAME = "jogo-da-velha";
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'img/jdv.png',
  'img/jdv1.png'
  

];
self.addEventListener("install", (event) => {
    caches.open(CACHE_NAME).then((cache) => {
        console.log("Cache aberto")
        return cache.addAll(FILES_TO_CACHE);
    });
});
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });