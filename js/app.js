/*
// Check if the sw is supported
if('serviceWorker' in navigator){
   
    navigator.serviceWorker.register('../sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err))
    

    navigator.serviceWorker.register('/sw.js').then(function(registration){
        console.log('service worker registration succeeded:', registration);
    },
    function(error){
        console.log('service worker registration failed:', error);
    });    
}else{
    console.log('service workers are not supported.');
}
*/

const swURL = "sw.js";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register(swURL).then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}