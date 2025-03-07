self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("nutrition-app").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/css/styles.css",
                "/js/app.js",
                "/data/nutrients.json",
                "/manifest.json"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
