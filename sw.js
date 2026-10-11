var C="rabbit-v14",F=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./images1.js","./images2.js","./images3.js"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return c.add(u).catch(function(){})}))}));
  self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));
  self.clients.claim();
});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)}).catch(function(){});return r})
    .catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("./index.html")})}));
});
