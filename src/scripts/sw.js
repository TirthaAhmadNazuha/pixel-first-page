import cacheHandler from './cacheHandler';

self.addEventListener('install', (event) => {
  console.log('Installing');
  self.skipWaiting();
});

self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', (event) => {
  const url = event.request.url.replace(self.location.origin, '');
  console.log(url);
  return;
});
