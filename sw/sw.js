const CACHE_NAME = 'service-worker-demo';
const urlsToCache = [
    './',
    'img/frenchFries.png',
    'img/bubbleTea.png'
]

this.addEventListener('install', function (event) {
    console.log('install sw.js')
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        })
       
    )
});

this.addEventListener('activate', function (event) {
    console.log('激活 sw.js，可以开始处理 fetch 请求。');
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (CACHE_NAME.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }))
        })
    )
});

this.addEventListener('fetch', function (event) {
    const url = new URL(event.request.url)
    if (url.pathname.endsWith('frenchFries.png')) {
        event.respondWith(caches.match('img/bubbleTea.png'))
    }
});
console.log('end');