'use strict';
(()=>{
const VERSION='3.4.0',SHELL='phase3-shell-'+VERSION,MEDIA='phase3-media-'+VERSION;
const files=[...new Set(Object.values(window.DEMO_MEDIA).flatMap(m=>m.images))];
let reg=null,running=false,completed=0,shellReady=false,downloadError='',updateMessage='',downloaded=false;
const text=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
function paint(){
 const online=navigator.onLine;
 const base=shellReady?'App ready offline.':'App offline setup pending — stay online.';
 const visuals=downloaded?'All 65 visual guides ready offline.':running?`Saving visuals: ${completed} of ${files.length} files.`:downloadError||`Visuals saved: ${completed} of ${files.length} files.`;
 text('offlineStatus',(online?'Online · ':'Offline · ')+base);
 text('mediaStatus',visuals);
 text('connectionStatus',(online?'Online':'Offline')+' · '+(shellReady?(downloaded?'App + guides saved offline':'App saved offline'):'Offline setup pending'));
 text('updateStatus',reg?.waiting?'Update ready. Back up your records, then close every app window and tab and reopen online.':updateMessage||`Version ${VERSION}. Updates never clear your training records.`);
 const p=document.getElementById('mediaProgress');if(p){p.max=files.length;p.value=completed;}
 document.querySelectorAll('[data-offline="download"]').forEach(b=>{b.disabled=running||!online;b.textContent=running?'Saving offline visuals…':downloaded?'Check offline visuals':'Download / retry offline visuals';});
 const banner=document.getElementById('updateNotice');if(banner)banner.hidden=!reg?.waiting;
}
async function inspect(){
 try{
  if(!('caches'in window))throw Error('Offline storage is unavailable in this browser.');
  shellReady=false;if(await caches.has(SHELL)){const shell=await caches.open(SHELL);const required=['./','./index.html','./style.css','./app.js','./core.js','./media.js','./demos.js','./offline.js','./data.js','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png','./programme.html','./review.html'];shellReady=(await Promise.all(required.map(f=>shell.match(f)))).every(Boolean);}
  if(await caches.has(MEDIA)){const cache=await caches.open(MEDIA);const keys=new Set((await cache.keys()).map(r=>r.url));completed=files.filter(f=>keys.has(new URL(f,location.href).href)).length;}else completed=0;
  downloaded=completed===files.length;
 }catch(e){downloadError='Offline storage unavailable. Keep the app online; records still need regular backups.';}
 paint();
}
async function download(){
 if(running||!navigator.onLine)return;
 if(!('caches'in window)||!('serviceWorker'in navigator)){downloadError='Offline saving requires a supported browser and HTTPS.';paint();return;}
 running=true;downloadError='';paint();
 try{
  const cache=await caches.open(MEDIA);let cursor=0,failed=0;completed=0;
  async function worker(){while(cursor<files.length){const f=files[cursor++];try{if(!await cache.match(f)){const response=await fetch(f);if(!response.ok)throw Error('Image download failed');await cache.put(f,response);}completed++;}catch{failed++;}paint();}}
  await Promise.all([worker(),worker()]);downloaded=completed===files.length;
  if(failed)downloadError=`${failed} visual files could not be saved. Reconnect and tap Download / retry offline visuals. Written coaching remains available.`;
 }catch{downloadError='Visuals could not be saved. Storage may be full or unavailable. Retry online.';}
 running=false;paint();
}
async function refresh(){if(!running)await inspect();else paint();}
window.Offline={refresh,download};
document.addEventListener('click',async ev=>{const b=ev.target.closest('[data-offline]');if(!b)return;if(b.dataset.offline==='download')download();if(b.dataset.offline==='update'){if(!reg){updateMessage='Update checking is unavailable. Open this app over HTTPS.';paint();return;}updateMessage='Checking for an update…';paint();try{await reg.update();updateMessage='Update check requested. Any available version will be announced when its download finishes.';}catch{updateMessage='Could not check for updates. Reconnect and try again.';}paint();}});
window.addEventListener('online',()=>{refresh().then(download);});window.addEventListener('offline',paint);
if('serviceWorker'in navigator&&location.protocol!=='file:'){
 navigator.serviceWorker.register('./sw.js').then(async r=>{reg=r;const watch=()=>{const worker=r.installing;if(worker)worker.addEventListener('statechange',()=>{refresh();});};r.addEventListener('updatefound',watch);watch();await navigator.serviceWorker.ready;await refresh();if(navigator.onLine)download();}).catch(()=>{downloadError='Offline setup failed. Reopen online over HTTPS.';paint();});
 navigator.serviceWorker.addEventListener('controllerchange',()=>{refresh().then(()=>{if(!downloaded&&navigator.onLine)download();});});
}else{downloadError='Offline setup requires HTTPS and a browser with service-worker support.';}
refresh();
})();
