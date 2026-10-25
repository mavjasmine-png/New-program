'use strict';
const CACHE='phase3-shell-3.4.0',MEDIA='phase3-media-3.4.0';
const FILES=['./','./index.html','./style.css','./app.js','./core.js','./media.js','./demos.js','./offline.js','./data.js','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png','./programme.html','./review.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
// Wait for old windows to close; never replace a running workout mid-session.
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k!==MEDIA&&(k.startsWith('phase3-')||k.startsWith('phase2-'))).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())));});
