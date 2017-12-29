//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache-v1';
var precacheFilesNEW = [];
var precacheFiles = [
    "libfaust-wasm.wasm",
    "mixer32.wasm",
    "faust.css",
    "editor.css",
    "tippy.css",
    "index.html",
    "libraries/all.lib",
    "libraries/analyzers.lib",
    "libraries/basics.lib",
    "libraries/compressors.lib",
    "libraries/delays.lib",
    "libraries/demos.lib",
    "libraries/dx7.lib",
    "libraries/envelopes.lib",
    "libraries/filters.lib",
    "libraries/hoa.lib",
    "libraries/instruments.lib",
    "libraries/maths.lib",
    "libraries/maxmsp.lib",
    "libraries/misceffects.lib",
    "libraries/noises.lib",
    "libraries/oscillators.lib",
    "libraries/phaflangers.lib",
    "libraries/physmodels.lib",
    "libraries/reducemaps.lib",
    "libraries/reverbs.lib",
    "libraries/routes.lib",
    "libraries/signals.lib",
    "libraries/spats.lib",
    "libraries/stdfaust.lib",
    "libraries/synths.lib",
    "libraries/tonestacks.lib",
    "libraries/tubes.lib",
    "libraries/vaeffects.lib",
    "scripts/compilefaust.js",
    "scripts/qrcode.js",
    "scripts/WebMIDIAPI.js",
    "scripts/runfaust.js",
    "scripts/ExportLib.js",
    "scripts/faustlive.js",
    "scripts/jsscripts.js",
    "scripts/exportUI.js",
    "scripts/tippy.min.js",
    "scripts/webaudio-wasm-wrapper.js",
    "scripts/libfaust-wasm.js",
    "font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0"
  ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[ServiceWorker] Skip waiting on install');
      return self.skipWaiting();

  })
  );
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
console.log('[ServiceWorker] Claiming clients for current page');
      return self.clients.claim();

});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}


function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


function update(request) {
  //this is where we call the server to get the newest version of the
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cahche to go to the server and get it
return fetch(request).then(function(response){ return response})
}
