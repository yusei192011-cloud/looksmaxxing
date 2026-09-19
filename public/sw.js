const CACHE = 'looksmaxxing-__CACHE_VERSION__';
const ASSETS = [
  './',
  './index.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // ネットワーク優先: 成功したらキャッシュ更新、失敗時はキャッシュから返す
  // ページ本体(HTML)は毎回サーバーに確認する。GitHub Pagesのmax-age=600で
  // デプロイ直後に古い画面が10分間残るのを防ぐ(ハッシュ付きassetsは通常キャッシュ)。
  const req = e.request.mode === 'navigate' ? new Request(e.request, { cache: 'no-cache' }) : e.request;
  e.respondWith(
    fetch(req).then(res => {
      if (!res || res.status !== 200 || res.type === 'opaque') return res;
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
