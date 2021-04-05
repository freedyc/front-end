// self: 表示 Service Worker 作用域, 也是全局变量
// caches: 表示缓存
// skipWaiting: 表示强制当前处在 waiting 状态的脚本进入 activate 状态
// clients: 表示 Service Worker 接管的页面

// 监听 install 事件，缓存 url。
// 监听 activate事件，移除过期缓存，保证应用更新版本后可以升级。
// 最后，通过fetch事件拦截网络请求做访问缓存逻辑处理。
var cacheName = 'Freedyc-v1'; //添加缓存版本戳
var filesToCache = [
  '/packages/test-screen/test-screen.html',
  '/',
];
self.addEventListener('install', function (event) {
  //首次访问会被触发
  //能够缓存所有的应用需要再次用到的资源。
  console.log('安装');
  // event.waitUntil(
  //     fetchStuffAndInitDatabases()
  // );
  //等到内部执行完resolve的时候继续进行下一步
  event.waitUntil(updateStaticCache());
});

function updateStaticCache() {
  return caches
    .open(cacheName)
    .then(function (cache) {
      //cache.addAll() 是原子操作，如果某个文件缓存失败了，那么整个缓存就会失败
      return cache.addAll(filesToCache);
    })
    .then(() => self.skipWaiting());
  // self.skipWaiting() 已经存在一个版本的 Service Worker 且有页面正在使用该版本，新版 Service Worker 便会进入等待状态
  //它必须等正在运行旧版本 Service Worker 的页面全部关闭后才会获得控制权，
  //.then(() => self.skipWaiting())
}
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          console.log('[ServiceWorker] Removing old cache', key);
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
self.addEventListener('fetch', function (event) {
  //包含所有的拦截请求
  //拦截请求
  //event.respondWith(new Response("Hello world!"));
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
