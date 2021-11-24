// console.log('service worker inside sw.js');

const cacheName = "app-shell-rsrs";
const dynamicCacheName = "dynamic-cache-v1";
const assets =[
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pkcontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'pages/default.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {
                cahce.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
};

// install service worker
self.addEventListener('install', evt => {
    //console.log('service worker has been installed.');
    evt.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets);
        })
    );    
});

// activate event
self.addEventListener('activate', evt =>{
    // console.log('service worker has been activated.');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete()))
        })
    )
});

// fetch event
/*
self.addEventListener('fetch', evt => {
    console.log(evt);

    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || evt.request;
        })
    );
});
*/

self.addEventListener('fetch', evt => {
    console.log('Fetch intercepted for:', evt.request.url);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            if(cacheRes) {
                return cacheRes;
            }
            return fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone())
                    limitCacheSize(dynamicCacheName, 15);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if(evt.request.url.indexOf('.html') > -1) {
                return caches.match('pages/default.html')
            }
        })
    );
});