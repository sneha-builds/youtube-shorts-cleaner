"use strict";(()=>{var q="__ytShortCleanerActive__",Y=`
#ytsc-overlay {
  position: fixed;
  top: 80px;
  right: 16px;
  width: 340px;
  max-height: 85vh;
  overflow-y: auto;
  background: #16162b;
  border: 1px solid #333354;
  border-radius: 12px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 13px;
  z-index: 2147483646;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  padding: 16px;
}
#ytsc-overlay *, #ytsc-overlay *::before, #ytsc-overlay *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#ytsc-overlay .ytsc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
#ytsc-overlay .ytsc-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #ff4757;
}
#ytsc-overlay .ytsc-title svg { flex-shrink: 0; }
#ytsc-overlay .ytsc-close {
  background: none;
  border: none;
  color: #888;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 4px;
}
#ytsc-overlay .ytsc-close:hover { color: #fff; background: #2d2d44; }
#ytsc-overlay .ytsc-section { margin-bottom: 10px; }
#ytsc-overlay .ytsc-label {
  font-size: 12px;
  color: #a0a0a0;
  margin-bottom: 8px;
}
#ytsc-overlay .ytsc-dates {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
#ytsc-overlay .ytsc-mode {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}
#ytsc-overlay .ytsc-mode-btn {
  padding: 7px 4px;
  background: #2d2d44;
  border: 1px solid #3d3d54;
  border-radius: 8px;
  color: #a0a0a0;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}
#ytsc-overlay .ytsc-mode-btn:hover { background: #3d3d54; color: #fff; }
#ytsc-overlay .ytsc-mode-btn.active {
  background: #ff4757;
  border-color: transparent;
  color: #fff;
  font-weight: 600;
}
#ytsc-overlay .ytsc-btn {
  padding: 9px 4px;
  background: #2d2d44;
  border: 1px solid #3d3d54;
  border-radius: 8px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}
#ytsc-overlay .ytsc-btn:hover { background: #3d3d54; }
#ytsc-overlay .ytsc-btn.ytsc-danger {
  background: linear-gradient(135deg, #ff4757 0%, #ff3838 100%);
  border-color: transparent;
  font-weight: 600;
  width: 100%;
  padding: 12px;
  font-size: 13px;
  margin-top: 12px;
}
#ytsc-overlay .ytsc-btn.ytsc-danger:hover { box-shadow: 0 4px 12px rgba(255,71,87,0.4); }
#ytsc-overlay .ytsc-btn.ytsc-ghost {
  background: none;
  border: 1px solid #3d3d54;
  color: #a0a0a0;
  width: 100%;
  padding: 10px;
  margin-top: 8px;
}
#ytsc-overlay .ytsc-progress {
  display: none;
  align-items: center;
  gap: 10px;
  color: #a0a0a0;
  font-size: 12px;
  padding: 8px 0;
}
#ytsc-overlay .ytsc-progress.show { display: flex; }
#ytsc-overlay .ytsc-spinner {
  width: 18px;
  height: 18px;
  border: 3px solid #2d2d44;
  border-top-color: #ff4757;
  border-radius: 50%;
  animation: ytsc-spin 0.8s linear infinite;
  flex-shrink: 0;
}
@keyframes ytsc-spin { to { transform: rotate(360deg); } }
#ytsc-overlay .ytsc-count-big {
  font-size: 30px;
  font-weight: 800;
  color: #ff4757;
  text-align: center;
  margin-bottom: 4px;
}
#ytsc-overlay .ytsc-msg {
  margin-top: 8px;
  font-size: 13px;
  color: #fff;
  text-align: center;
}
#ytsc-overlay .ytsc-warn {
  margin-top: 6px;
  font-size: 11px;
  color: #cca86a;
  text-align: center;
}
#ytsc-overlay .ytsc-list {
  margin-top: 10px;
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #2d2d44;
  border-radius: 6px;
  padding: 4px;
}
#ytsc-overlay .ytsc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px;
  border-radius: 4px;
}
#ytsc-overlay .ytsc-item:hover { background: #2d2d44; }
#ytsc-overlay .ytsc-item img {
  width: 60px;
  height: 34px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}
#ytsc-overlay .ytsc-item .ytsc-t {
  font-size: 11px;
  color: #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#ytsc-overlay .ytsc-card { display: none; }
#ytsc-overlay .ytsc-card.show { display: block; }
#ytsc-overlay .ytsc-actions { display: flex; }
#ytsc-overlay .ytsc-hidden { display: none !important; }
#ytsc-overlay .ytsc-debug {
  display: none;
  margin-top: 10px;
  background: #0f0f20;
  border: 1px solid #2d2d44;
  border-radius: 6px;
  padding: 8px;
  max-height: 200px;
  overflow: auto;
}
#ytsc-overlay .ytsc-debug.show { display: block; }
#ytsc-overlay .ytsc-debug pre {
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 10px;
  color: #9fc9ff;
  font-family: monospace;
  margin: 0;
  line-height: 1.5;
}
`,g=null,w="shorts";function D(){return w==="shorts"?"Shorts":w==="videos"?"Videos":"items"}function v(n){return new Promise(t=>setTimeout(t,n))}function f(n,t=document){return Array.from(t.querySelectorAll(n))}function F(n){let t=new Date,e=n||"";if(/\bjust now\b/i.test(e)||/\ba moment ago\b/i.test(e))return t;let s=e.match(/(?:watched|viewed|watch|view)?\s*(?:a|an|one|\d+)\s*(second|minute|hour|day|week|month|year)s?\s*ago/i);if(s){let i=s[0],c=s[2].toLowerCase(),l=i.match(/(\d+)/),o=l?parseInt(l[1],10):1,a=new Date(t);return c.startsWith("second")?a.setSeconds(t.getSeconds()-o):c.startsWith("minute")?a.setMinutes(t.getMinutes()-o):c.startsWith("hour")?a.setHours(t.getHours()-o):c.startsWith("day")?a.setDate(t.getDate()-o):c.startsWith("week")?a.setDate(t.getDate()-o*7):c.startsWith("month")?a.setMonth(t.getMonth()-o):c.startsWith("year")&&a.setFullYear(t.getFullYear()-o),a}if(/\byesterday\b/i.test(e)){let i=new Date(t);return i.setDate(t.getDate()-1),i.setHours(12,0,0,0),i}let r=e.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:,?\s+\d{4})?/i);if(r){let i=new Date(r[0]);if(!isNaN(i.getTime()))return i}return null}var N=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],j=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];function k(n){let t=new Date,e=(n||"").trim().toLowerCase();if(!e)return null;if(e.startsWith("today")){let c=new Date(t);return c.setHours(12,0,0,0),c}if(e.startsWith("yesterday")){let c=new Date(t);return c.setDate(t.getDate()-1),c.setHours(12,0,0,0),c}let s=j.findIndex(c=>e.startsWith(c));if(s!==-1){let c=new Date(t),l=(c.getDay()-s+7)%7;return l===0&&(l=7),c.setDate(c.getDate()-l),c.setHours(12,0,0,0),c}let r=e.match(/^(\d{1,2})\s+([a-z]{3,})/);if(r){let c=parseInt(r[1],10),l=N.findIndex(o=>r[2].startsWith(o));if(l!==-1){let o=new Date(t.getFullYear(),l,c,12,0,0);return o.getTime()>t.getTime()&&o.setFullYear(t.getFullYear()-1),o}}let i=e.match(/^([a-z]{3,})\s+(\d{1,2})/);if(i){let c=N.findIndex(l=>i[1].startsWith(l));if(c!==-1){let l=parseInt(i[2],10),o=new Date(t.getFullYear(),c,l,12,0,0);return o.getTime()>t.getTime()&&o.setFullYear(t.getFullYear()-1),o}}return null}function R(n){try{let t=(n||"").replace(/\s+/g," ").trim();if(!t)return null;let e=k(t);if(e)return e;let s=t.split(" ");return e=k(s.slice(0,2).join(" ")),e||(e=k(s.slice(0,4).join(" ")),e)?e:k(s[0])}catch{return null}}function A(n){let t=n;for(;t&&t!==document.body;){let e=t.tagName.toLowerCase();if(e==="ytd-item-section-renderer"||e==="ytm-item-section-renderer"||e==="ytd-continuation-item-renderer")return t;t=t.parentElement}return null}function p(n){let t=A(n);if(!t)return null;try{let s=f('ytd-section-title-renderer, ytd-item-section-header-renderer, #section-title, [id^="section-title"]',t);for(let r of s){let i=(r.textContent||"").replace(/\s+/g," ").trim();if(i&&i.length<60){let c=R(i);if(c)return c}}}catch{}let e=(t.innerText||"").split(`
`).map(s=>s.trim()).filter(Boolean);if(e.length){let s=R(e[0]);if(s)return s}return null}function J(n){let t=n.querySelector("img#img, img.yt-core-image"),e=t?.getAttribute("src")||t?.getAttribute("data-thumb")||"";return e.startsWith("http")?e:""}function T(n){let t=n;for(;t&&t!==document.body;){let e=t.tagName.toLowerCase();if(e==="ytd-video-renderer"||e==="ytd-grid-video-renderer"||e==="ytd-playlist-video-renderer"||e==="ytd-compact-video-renderer"||e==="ytm-shorts-lockup-view-model")return t;t=t.parentElement}return null}function V(){let n=new Set;return f("#contents a#video-title").forEach(t=>n.add(t)),f("#contents a#video-title-link").forEach(t=>n.add(t)),f('#contents a[href*="/shorts/"]').forEach(t=>n.add(t)),f('#contents a[href*="/watch?v="]').forEach(t=>n.add(t)),f("#contents ytd-video-renderer #dismissible h3 a").forEach(t=>n.add(t)),f("#contents ytd-grid-video-renderer a").forEach(t=>{(t.getAttribute("href")||"").includes("/shorts/")&&n.add(t)}),Array.from(n)}function _(n){let t=n.querySelector('ytd-thumbnail-overlay-time-status-renderer, [class*="time-status"], span[class*="badge"]'),s=((t?t.textContent:"")||n.textContent||"").match(/\b(\d{1,3}):(\d{2})(?::(\d{2}))?\b/);if(!s)return null;let r=parseInt(s[1],10),i=parseInt(s[2],10),c=s[3]?parseInt(s[3],10):0;return!!s[3]||r>=10?r*3600+i*60+c:r*60+i}function U(n){let t=n.querySelector("img#img, img.yt-core-image"),e=[];if(t){t.width&&t.height&&e.push([t.width,t.height]);let r=parseInt(t.getAttribute("width")||"0",10),i=parseInt(t.getAttribute("height")||"0",10);r&&i&&e.push([r,i])}if(e.some(([r,i])=>i>r))return!0;let s=n.querySelector("ytd-thumbnail");if(s){let r=(s.getAttribute("style")||"")+" "+s.className.toString();if(/aspect-ratio\s*:\s*9\s*\/\s*16|\bwin%-\d{2,3}x\d{2,3}\b|portrait/i.test(r))return!0}return!1}function X(n,t){if(/\/shorts\//.test(n)||t.tagName.toLowerCase()==="ytm-shorts-lockup-view-model")return!0;let e=_(t);return!!(e!==null&&e<=180&&U(t))}function W(n){let t=[],e=(s,r)=>{let i=s.getAttribute("href")||"",c=i.match(/\/shorts\/([\w-]{11})/)||i.match(/[?&]v=([\w-]{11})/);if(!c)return;let l=r.querySelector("a#video-title, a#video-title-link, h3 a, #video-title");t.push({card:r,link:l||s,href:i,videoId:c[1],short:X(i,r)})};return n.querySelectorAll('a[href*="/shorts/"]').forEach(s=>e(s,T(s)||s)),n.querySelectorAll('a[href*="/watch?v="]').forEach(s=>e(s,T(s)||s)),t}function G(){return f("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer").flatMap(n=>W(n))}function H(n){let t=new Set,e=0;for(let s of G())t.has(s.videoId)||n==="shorts"&&!s.short||n==="videos"&&s.short||(t.add(s.videoId),e++);return e}function K(n,t){let e=new Set,s=[],r=0,i=[],c=f("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer");for(let l of c){let o=p(l);for(let a of W(l)){if(e.has(a.videoId)||t==="shorts"&&!a.short||t==="videos"&&a.short)continue;e.add(a.videoId);let u=(a.card.textContent||"").replace(/\s+/g," ").trim(),m=F(u)||o,h="unknown";m&&(h=m>=n.start&&m<=n.end?"in":"out"),h==="in"?s.push({videoId:a.videoId,title:a.link.getAttribute("title")||a.link.textContent?.trim()||u.slice(0,80)||(a.short?"Short":"Video"),thumbnail:J(a.card),watchedAt:m,range:h,isShort:a.short,href:a.href,el:a.card}):h==="unknown"&&(r++,i.length<5&&!m&&i.push(u.slice(0,300)))}}return{inRange:s,skipped:r,samples:i}}async function Q(n,t,e){let s=f("yt-horizontal-list-renderer");for(let r of s){let i=r.querySelector('a[href*="/shorts/"]')||r,c=p(i);if(c&&c.getTime()<e.start.getTime())continue;let l=r.querySelector("#scroll-container")||r.querySelector("#items")||r,o=0;for(let a=0;a<20;a++){let u=r.querySelectorAll('a[href*="/shorts/"]').length;try{l.scrollLeft=l.scrollWidth,l.scrollTo({left:l.scrollWidth,behavior:"smooth"});let m=r.querySelector('#right-arrow button, [aria-label="Next"]');m&&m.click()}catch{}await v(700);let y=r.querySelectorAll('a[href*="/shorts/"]').length;if(n(H(t)),y===u){if(o++,o>=3)break}else o=0}}}function Z(){return f("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer").map(n=>p(n)).filter(n=>!!n)}function tt(n){let t=Z();if(!t.length)return!1;let e=1/0;for(let s of t)s.getTime()<e&&(e=s.getTime());return e<=n.start.getTime()}async function et(n,t,e){let s=-1,r=0,i=0;for(let c=0;c<35&&(window.scrollTo(0,document.body.scrollHeight),await v(1200),i=H(t),n(i),!tt(e));c++){if(i===s){if(r++,r>=3)break}else r=0;s=i}return t!=="videos"&&await Q(n,t,e),i=H(t),i}function B(n){let t=[];return n.querySelectorAll("*").forEach(e=>{let s=e.shadowRoot;s&&t.push(s)}),t}function I(n,t){let e=n.querySelector(t);if(e)return e;for(let s of B(n)){let r=I(s,t);if(r)return r}return null}function M(n,t){let e=Array.from(n.querySelectorAll(t));return B(n).forEach(s=>e.push(...M(s,t))),e}function P(n){return I(n,'button[aria-label*="More actions"], [aria-label="More actions" i], ytd-menu-renderer button, ytd-menu-renderer #top-level-button, [aria-label*="Action menu" i], button[aria-label*="Action menu"]')}function nt(n){let t=document.querySelector(`a[href*="/shorts/${n}"], a[href*="v=${n}"]`);return t?T(t):null}var S=[];function x(n){S.length<5&&S.push(n),console.log("[YTS-Cleaner] "+n)}function st(){let n=["remove from watch history","remove from history","delete from history"],t=M(document.documentElement,'ytd-menu-service-item-renderer, tp-yt-paper-item, yt-list-item-view-model, [role="menuitem"], [role="option"]');for(let r of t){let i=(r.textContent||"").trim().toLowerCase();if(n.some(c=>i.includes(c)))return r}let e=M(document.documentElement,"*"),s=null;for(let r of e){let i=(r.textContent||"").trim(),c=i.toLowerCase();i.length>0&&i.length<60&&n.some(l=>c.includes(l))&&(!s||i.length<(s.textContent||"").trim().length)&&(s=r)}return s}async function ot(n,t){let e=t&&t.isConnected?t:nt(n);if(!e)return x(`[${n}] card not found`),!1;let s=P(e);if(!s)return x(`[${n}] no "More actions" button found`),!1;try{s.scrollIntoView({block:"center"}),await v(200);let o=s.getBoundingClientRect(),a=o.left+o.width/2,u=o.top+o.height/2;s.dispatchEvent(new PointerEvent("pointerenter",{bubbles:!0,composed:!0,clientX:a,clientY:u})),s.dispatchEvent(new PointerEvent("pointerover",{bubbles:!0,composed:!0,clientX:a,clientY:u})),s.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,composed:!0})),s.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,composed:!0,clientX:a,clientY:u})),await v(300),s.click(),await v(1200)}catch(o){return x(`[${n}] click threw: ${o}`),!1}let r=st();if(r)return r.click(),await v(900),x(`[${n}] removed OK`),!0;let i=I(document.documentElement,"ytd-popup-container, tp-yt-iron-dropdown, ytm-menu-popup-renderer"),c=i?(i.innerText||"").replace(/\s+/g," ").trim().slice(0,200):"none",l=M(document.documentElement,'[role="menuitem"], [role="option"]').map(o=>(o.textContent||"").trim().slice(0,30)).filter(Boolean);return x(`[${n}] no remove option. popup="${c}" items=${JSON.stringify(l.slice(0,6))}`),document.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),!1}function d(n){return document.getElementById(n)}function $(n){b("ready"),d("ytsc-count-big").textContent="0",d("ytsc-msg").textContent="",d("ytsc-warn").textContent="",d("ytsc-list").innerHTML="",d("ytsc-delete-label").textContent="Delete "+D(),d("ytsc-title").textContent=n}function b(n){g?.querySelectorAll(".ytsc-card")?.forEach(e=>{let s=e;s.classList.toggle("show",s.dataset.card===n)})}function C(n,t){d("ytsc-progress").classList.toggle("show",n),d("ytsc-progress-text").textContent=t}function rt(n){let t=new Date,e=new Date(t);n===1&&e.setHours(0,0,0,0);let s=new Date(e);return s.setDate(e.getDate()-n),s.setHours(0,0,0,0),{start:s,end:e}}function z(n){return n===0?"today":n===1?"yesterday":`the last ${n} days`}function it(){g=document.createElement("div"),g.id="ytsc-overlay",g.innerHTML=`
    <style>${Y}</style>
    <div class="ytsc-head">
      <div class="ytsc-title" id="ytsc-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="3" fill="#ff4757"/>
          <path d="M10 9l5 3-5 3V9z" fill="#fff"/>
        </svg>
        YouTube Shorts Cleaner
      </div>
      <button class="ytsc-close" id="ytsc-close" title="Close">\u2715</button>
    </div>

    <div class="ytsc-card" data-card="ready">
      <div class="ytsc-label" id="ytsc-mode-label">Delete items watched\u2026</div>
      <div class="ytsc-mode">
        <button class="ytsc-mode-btn active" data-mode="shorts">Shorts</button>
        <button class="ytsc-mode-btn" data-mode="videos">Videos</button>
        <button class="ytsc-mode-btn" data-mode="all">All</button>
      </div>
      <div class="ytsc-dates">
        <button class="ytsc-btn" data-days="0">Today</button>
        <button class="ytsc-btn" data-days="1">Yesterday</button>
        <button class="ytsc-btn" data-days="3">Last 3 Days</button>
        <button class="ytsc-btn" data-days="7">Last 7 Days</button>
        <button class="ytsc-btn" data-days="30">Last 30 Days</button>
      </div>
      <div class="ytsc-progress" id="ytsc-progress">
        <div class="ytsc-spinner"></div>
        <span id="ytsc-progress-text">Loading\u2026</span>
      </div>
    </div>

    <div class="ytsc-card" data-card="results">
      <div class="ytsc-count-big" id="ytsc-count-big">0</div>
      <div class="ytsc-label" style="text-align:center" id="ytsc-range-label">Shorts found</div>
      <div class="ytsc-list" id="ytsc-list"></div>
      <div class="ytsc-warn" id="ytsc-warn"></div>
      <div class="ytsc-debug" id="ytsc-debug">
        <div class="ytsc-label">Raw page debug info \u2014 copy &amp; paste this back to the developer</div>
        <pre id="ytsc-debug-text"></pre>
      </div>
      <button class="ytsc-btn ytsc-danger" id="ytsc-delete-btn">Delete Shorts</button>
      <button class="ytsc-btn ytsc-ghost" id="ytsc-back">Choose Another Range</button>
    </div>

    <div class="ytsc-card" data-card="deleting">
      <div class="ytsc-progress show" id="ytsc-progress-deleting">
        <div class="ytsc-spinner"></div>
        <span id="ytsc-deleting-text">Deleting\u2026</span>
      </div>
    </div>

    <div class="ytsc-card" data-card="done">
      <div class="ytsc-count-big" id="ytsc-done-count">0</div>
      <div class="ytsc-label" style="text-align:center" id="ytsc-done-label">Done!</div>
      <div class="ytsc-warn" id="ytsc-done-warn"></div>
      <button class="ytsc-btn ytsc-ghost" id="ytsc-close-done">Close</button>
    </div>
  `,document.documentElement.appendChild(g),d("ytsc-close").addEventListener("click",()=>g?.remove()),d("ytsc-close-done").addEventListener("click",()=>g?.remove()),g.querySelectorAll(".ytsc-mode .ytsc-mode-btn").forEach(n=>{n.addEventListener("click",()=>{w=n.dataset.mode,g.querySelectorAll(".ytsc-mode .ytsc-mode-btn").forEach(t=>t.classList.toggle("active",t===n)),d("ytsc-mode-label").textContent="Delete items watched\u2026",$("Pick a date range")})}),g.querySelectorAll(".ytsc-dates .ytsc-btn").forEach(n=>{n.addEventListener("click",()=>{let t=parseInt(n.dataset.days||"0",10);at(t)})}),d("ytsc-delete-btn").addEventListener("click",lt),d("ytsc-back").addEventListener("click",()=>{b("ready"),$("Pick a date range")})}var E=[];function ct(n,t){let e=[];e.push("URL: "+window.location.href),e.push("mode: "+w);let s=document.querySelectorAll("#contents ytd-video-renderer");if(e.push("ytd-video-renderer count: "+s.length),s.length){let o=s[0],a=Array.from(o.querySelectorAll("a")).slice(0,5).map(u=>(u.getAttribute("href")||"").slice(0,60)).filter(Boolean);e.push("vr#1 connected: "+o.isConnected),e.push("vr#1 in template: "+!!o.closest("template")),e.push("vr#1 links: "+JSON.stringify(a)),e.push("vr#1 html head: "+o.outerHTML.replace(/\s+/g," ").slice(0,250))}else e.push("ytd-video-renderer (anywhere): "+document.querySelectorAll("ytd-video-renderer").length);let r=V();e.push("total title links: "+r.length),e.push("short links: "+r.filter(o=>(o.getAttribute("href")||"").includes("/shorts/")).length),e.push("video links: "+r.filter(o=>!!o.getAttribute("href")&&/[?&]v=/.test(o.getAttribute("href")||"")&&!(o.getAttribute("href")||"").includes("/shorts/")).length),e.push("--- per-section counts ---"),f("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer").forEach((o,a)=>{if(a>=18)return;let u=(o.innerText||"").split(`
`).map(m=>m.trim()).filter(Boolean)[0]||"?",y=p(o);e.push(`  ${a+1}. header="${u.slice(0,30)}" date=${y?y.toISOString().slice(0,10):"?"} shorts=${o.querySelectorAll('a[href*="/shorts/"]').length} videos=${o.querySelectorAll('a[href*="/watch?v="]').length}`)});let i=document.querySelector('#contents a[href*="/watch?v="]');if(i){let o=T(i),a=o?A(o):null;e.push("first watch?v card: "+(o?o.tagName:"null")),e.push("first watch?v section: "+(a?a.tagName:"null")),e.push("first watch?v sectionDateHint: "+(a&&p(a)?p(a).toISOString().slice(0,10):"?")),e.push("first watch?v html head: "+(o?o.outerHTML.replace(/\s+/g," ").slice(0,250):"none"))}let c=document.querySelector('#contents a[href*="/shorts/"]');if(c){let o=T(c);if(e.push("first short card tag: "+(o?o.tagName:"null")),o){let a=[],u=o;for(let L=0;L<8&&u;L++)a.push(u.tagName.toLowerCase()),u=u.parentElement;e.push("card ancestor tags: "+JSON.stringify(a));let y=P(o);e.push("card has menu button: "+!!y),y&&e.push("menu button label: "+y.getAttribute("aria-label"));let m=(o.textContent||"").replace(/\s+/g," ").trim();e.push("first card textContent: "+m.slice(0,300));let h=A(o);if(e.push("found section: "+(h?h.tagName:"null")),h){let L=(h.innerText||"").split(`
`).map(O=>O.trim()).filter(Boolean);e.push("section first lines: "+JSON.stringify(L.slice(0,4))),e.push("sectionDateHint result: "+(p(o)?p(o).toString():"null"))}}}let l=[];return document.querySelectorAll("ytd-item-section-renderer, ytm-item-section-renderer").forEach(o=>{let a=(o.innerText||"").split(`
`).filter(u=>u.trim());a.length&&l.length<15&&l.push(a[0].trim().slice(0,60))}),e.push("section headers: "+JSON.stringify(l)),n.forEach((o,a)=>e.push(`sample ${a}: ${o}`)),t&&t.length&&(e.push(`--- in-range (${t.length}) ---`),t.slice(0,30).forEach((o,a)=>{let u=o.watchedAt?o.watchedAt.toISOString().slice(0,10):"?";e.push(`  ${a+1}. [${o.isShort?"S":"V"}] ${u} ${o.title.slice(0,50)}`)})),e.join(`
`)}async function at(n){b("ready"),C(!0,"Loading your history\u2026 (detected so far: 0)");let t=rt(n),e=await et(y=>{d("ytsc-progress-text").textContent=`Loading your history\u2026 (detected so far: ${y})`},w,t);C(!0,"Analyzing watched dates\u2026");let{inRange:s,skipped:r,samples:i}=K(t,w);E=s;let c=D(),l=c.charAt(0).toUpperCase()+c.slice(1),o=`${r} ${c} found but their watch date couldn't be read \u2014 skipped to avoid deleting outside your range.`,a=ct(i,s);if(s.length===0){b("results"),d("ytsc-count-big").textContent="0",d("ytsc-range-label").textContent=`No ${c} found in ${z(n)}`,d("ytsc-list").innerHTML="",d("ytsc-warn").textContent=r>0?o:"",d("ytsc-delete-btn").style.display="none",d("ytsc-debug").classList.toggle("show",!0),d("ytsc-debug-text").textContent=a,console.log(`[YTS-Cleaner] DEBUG DUMPS:
`+a);return}b("results"),d("ytsc-count-big").textContent=s.length.toString();let u=`${l} watched ${z(n)} (found ${e} total in loaded history)`;if(w==="all"){let y=s.filter(h=>h.isShort).length,m=s.length-y;u+=`<span style="display:block;margin-top:4px;color:#ff4757">${y} Shorts \xB7 ${m} Videos</span>`}d("ytsc-range-label").innerHTML=u,d("ytsc-delete-btn").style.display="block",d("ytsc-delete-label"),d("ytsc-list").innerHTML=s.slice(0,20).map(y=>`
    <div class="ytsc-item">
      <img src="${y.thumbnail}" alt="">
      <div class="ytsc-t">${y.title.replace(/</g,"&lt;")}</div>
    </div>
  `).join(""),d("ytsc-warn").textContent=r>0?o:"",d("ytsc-debug").classList.toggle("show",!0),d("ytsc-debug-text").textContent=a,C(!1,"")}async function lt(){if(E.length===0)return;S.length=0,b("deleting"),d("ytsc-deleting-text").textContent=`Deleting\u2026 0 / ${E.length}`;let n=0,t=0,e=0;for(let s of E)e++,await ot(s.videoId,s.el)?n++:t++,d("ytsc-deleting-text").textContent=`Deleting\u2026 ${e} / ${E.length}`,await v(500);b("done"),d("ytsc-done-count").textContent=n.toString(),d("ytsc-done-label").textContent=t>0?`Deleted ${n} ${D()} \xB7 ${t} could not be removed`:`Deleted ${n} ${D()} from your history!`,d("ytsc-done-warn").textContent=t>0?"Debug: "+S.slice(0,5).join(" | "):"",console.log("[YTS-Cleaner] delete log:",JSON.stringify(S,null,2))}function dt(){let n=document.createElement("style");n.textContent=Y,document.head.appendChild(n),g||it(),b("ready"),$("Pick a date range")}(function(){if(window[q])return;window[q]=!0,console.log("[YTS-Cleaner] content script loaded");let t=()=>{document.querySelectorAll("#contents").length>0?(console.log("[YTS-Cleaner] injecting panel"),dt()):setTimeout(t,800)};setTimeout(t,1e3)})();})();
