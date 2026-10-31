const V='kayan-v12',CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./images/kayan-logo.png'],EXT=['https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);await Promise.all(EXT.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{})))}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.pathname.includes('/rest/v1/')||u.pathname.includes('/auth/v1/'))return;
  const put=x=>{if(x&&(x.ok||x.type==='opaque')){const cp=x.clone();caches.open(V).then(c=>c.put(r,cp))}return x};
  if(u.origin===location.origin)e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
  else e.respondWith(caches.match(r).then(m=>m||fetch(r).then(put)))});
