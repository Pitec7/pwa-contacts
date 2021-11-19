// console.log('service worker inside sw.js');

const cacheName = "app-shell-rsrs";
const assets =[
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pkcontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];


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
    console.log('service worker has been activated.');
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
            return fetch(evt.request);
        })
    );
});