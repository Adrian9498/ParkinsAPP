const STATIC_CACHE = 'static';

const APP_SHELL = [
    "./",
    "./index.html",
    "./login.html",
    "./medicos.html",
    "./css/style.css",
    "./js/login.js",
    "./js/script.js",
    "./js/medicos.js",
];

self.addEventListener("install",(e)=>{
    const cacheStatic = caches
        .open(STATIC_CACHE)
        .then((cache)=> cache.addAll(APP_SHELL));
    e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
    if(!navigator.onLine){
        e.respondWith(
            caches
            .match(e.request)
            .then((res) => res || fetch(e.request))
            .catch(console.log)
        );
    }else{
        e.respondWith(fetch(e.request));
    }
});