const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function(event) {
    console.log('Service working installing', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(cache => {
                console.log('[Service worker] Precaching static data');
                cache.addAll([
                    '/',
                    '/index.html',
                    // '/manifest.json',
                    '/assets/TimerPWA-logos_transparent',
                    '/main.bundle.js'
                ]);
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Service working activating');
    event.waitUntil(
        caches.keys()
            .then(keylist => {
                return Promise.all(keylist.map(key => {
                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                        console.log('[Service worker] Removing old caché', key);
                        return caches.delete(key);
                    }
                }))
            })
    )
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(response => {
                            caches.open(CACHE_DYNAMIC_NAME)
                                .then(cache=> {
                                    cache.put(event.request.url, response.clone());
                                    return response;
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                }
            })
    );
});