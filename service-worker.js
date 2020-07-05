importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  { url: './', revision: '140' },
  { url: './index.html', revision: '140' },
  { url: './home.html', revision: '140' },
  { url: './match.html', revision: '140' },
  { url: './clubs.html', revision: '140' },
  { url: './club-detail.html', revision: '140' },
  { url: './favorite-clubs.html', revision: '140' },
  { url: './saved-match.html', revision: '140' },
  { url: './main.js', revision: '140' },
  { url: './manifest.json', revision: '140' },
  { url: './images/logo.png', revision: '140' },
  { url: './images/stadion.jpg', revision: '140' }
]);

workbox.routing.registerRoute(
  new RegExp('.svg'),
  new workbox.strategies.CacheFirst({
      cacheName: 'logo'
  })
);

workbox.routing.registerRoute(
  new RegExp('/images/'),
  new workbox.strategies.CacheFirst({
      cacheName: 'images'
  })
);

workbox.routing.registerRoute(
  new RegExp('/icons/android/'),
  new workbox.strategies.CacheFirst({
      cacheName: 'android-icons'
  })
);

workbox.routing.registerRoute(
  new RegExp('/icons/AppIcon.appiconset/'),
  new workbox.strategies.CacheFirst({
      cacheName: 'apple-icons'
  })
);

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com' ||
             url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-stylesheets'
  })
);

workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://api.football-data.org',
  new workbox.strategies.CacheFirst({
    cacheName: 'football-data',
  })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Premiere League';
  }

  const options = {
    body: body,
    icon: './icons/AppIcon.appiconset/100.png',
    vibrate: [100, 58, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Premiere League', options)
  );
});