"use strict";(()=>{var R="__ytShortCleanerActive__",O=`
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
`,g=null,w="shorts";function k(){return w==="shorts"?"Shorts":w==="videos"?"Videos":"items"}function b(n){return new Promise(t=>setTimeout(t,n))}function h(n,t=document){return Array.from(t.querySelectorAll(n))}function J(n){let t=new Date,e=n||"";if(/\bjust now\b/i.test(e)||/\ba moment ago\b/i.test(e))return t;let s=e.match(/(?:watched|viewed|watch|view)?\s*(?:a|an|one|\d+)\s*(second|minute|hour|day|week|month|year)s?\s*ago/i);if(s){let i=s[0],c=s[2].toLowerCase(),d=i.match(/(\d+)/),o=d?parseInt(d[1],10):1,l=new Date(t);return c.startsWith("second")?l.setSeconds(t.getSeconds()-o):c.startsWith("minute")?l.setMinutes(t.getMinutes()-o):c.startsWith("hour")?l.setHours(t.getHours()-o):c.startsWith("day")?l.setDate(t.getDate()-o):c.startsWith("week")?l.setDate(t.getDate()-o*7):c.startsWith("month")?l.setMonth(t.getMonth()-o):c.startsWith("year")&&l.setFullYear(t.getFullYear()-o),l}if(/\byesterday\b/i.test(e)){let i=new Date(t);return i.setDate(t.getDate()-1),i.setHours(12,0,0,0),i}let r=e.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:,?\s+\d{4})?/i);if(r){let i=new Date(r[0]);if(!isNaN(i.getTime()))return i}return null}var z=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],V=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];function M(n){let t=new Date,e=(n||"").trim().toLowerCase();if(!e)return null;if(e.startsWith("today")){let c=new Date(t);return c.setHours(12,0,0,0),c}if(e.startsWith("yesterday")){let c=new Date(t);return c.setDate(t.getDate()-1),c.setHours(12,0,0,0),c}let s=V.findIndex(c=>e.startsWith(c));if(s!==-1){let c=new Date(t),d=(c.getDay()-s+7)%7;return d===0&&(d=7),c.setDate(c.getDate()-d),c.setHours(12,0,0,0),c}let r=e.match(/^(\d{1,2})\s+([a-z]{3,})/);if(r){let c=parseInt(r[1],10),d=z.findIndex(o=>r[2].startsWith(o));if(d!==-1){let o=new Date(t.getFullYear(),d,c,12,0,0);return o.getTime()>t.getTime()&&o.setFullYear(t.getFullYear()-1),o}}let i=e.match(/^([a-z]{3,})\s+(\d{1,2})/);if(i){let c=z.findIndex(d=>i[1].startsWith(d));if(c!==-1){let d=parseInt(i[2],10),o=new Date(t.getFullYear(),c,d,12,0,0);return o.getTime()>t.getTime()&&o.setFullYear(t.getFullYear()-1),o}}return null}function Y(n){try{let t=(n||"").replace(/\s+/g," ").trim();if(!t)return null;let e=M(t);if(e)return e;let s=t.split(" ");return e=M(s.slice(0,2).join(" ")),e||(e=M(s.slice(0,4).join(" ")),e)?e:M(s[0])}catch{return null}}function $(n){let t=n;for(;t&&t!==document.body;){let e=t.tagName.toLowerCase();if(e==="ytd-item-section-renderer"||e==="ytm-item-section-renderer"||e==="ytd-continuation-item-renderer")return t;t=t.parentElement}return null}function p(n){let t=$(n);if(!t)return null;try{let s=h('ytd-section-title-renderer, ytd-item-section-header-renderer, #section-title, [id^="section-title"]',t);for(let r of s){let i=(r.textContent||"").replace(/\s+/g," ").trim();if(i&&i.length<60){let c=Y(i);if(c)return c}}}catch{}let e=(t.innerText||"").split(`
`).map(s=>s.trim()).filter(Boolean);if(e.length){let s=Y(e[0]);if(s)return s}return null}function _(n){let t=n.querySelector("img#img, img.yt-core-image"),e=t?.getAttribute("src")||t?.getAttribute("data-thumb")||"";return e.startsWith("http")?e:""}function x(n){let t=n;for(;t&&t!==document.body;){let e=t.tagName.toLowerCase();if(e==="ytd-video-renderer"||e==="ytd-grid-video-renderer"||e==="ytd-playlist-video-renderer"||e==="ytd-compact-video-renderer"||e==="ytm-shorts-lockup-view-model")return t;t=t.parentElement}return null}function U(){let n=new Set;return h("#contents a#video-title").forEach(t=>n.add(t)),h("#contents a#video-title-link").forEach(t=>n.add(t)),h('#contents a[href*="/shorts/"]').forEach(t=>n.add(t)),h('#contents a[href*="/watch?v="]').forEach(t=>n.add(t)),h("#contents ytd-video-renderer #dismissible h3 a").forEach(t=>n.add(t)),h("#contents ytd-grid-video-renderer a").forEach(t=>{(t.getAttribute("href")||"").includes("/shorts/")&&n.add(t)}),Array.from(n)}function B(n,t,e,s){return s?n*3600+t*60+e:n*60+t}function H(n){let t='ytd-thumbnail-overlay-time-status-renderer, [class*="time-status"], .badge-shape-wiz__text, span[class*="badge"], [class*="time"]';for(let s of n.querySelectorAll(t)){let i=(s.textContent||"").trim().match(/^(\d{1,3}):(\d{2})(?::(\d{2}))?$/);if(i)return B(parseInt(i[1],10),parseInt(i[2],10),i[3]?parseInt(i[3],10):0,!!i[3])}let e=null;for(let s of n.querySelectorAll("*")){let r=(s.textContent||"").trim();r.length>0&&r.length<10&&/^\d{1,3}:\d{2}(?::\d{2})?$/.test(r)&&(!e||r.length<(e.textContent||"").trim().length)&&(e=s)}if(e){let s=(e.textContent||"").trim().match(/^(\d{1,3}):(\d{2})(?::(\d{2}))?$/);if(s)return B(parseInt(s[1],10),parseInt(s[2],10),s[3]?parseInt(s[3],10):0,!!s[3])}return null}function X(n){let t=n.querySelector("img#img, img.yt-core-image"),e=[];if(t){t.width&&t.height&&e.push([t.width,t.height]);let r=parseInt(t.getAttribute("width")||"0",10),i=parseInt(t.getAttribute("height")||"0",10);r&&i&&e.push([r,i])}if(e.some(([r,i])=>i>r))return!0;let s=n.querySelector("ytd-thumbnail");if(s){let r=(s.getAttribute("style")||"")+" "+s.className.toString();if(/aspect-ratio\s*:\s*9\s*\/\s*16|\bwin%-\d{2,3}x\d{2,3}\b|portrait/i.test(r))return!0}return!1}function G(n,t){if(/\/shorts\//.test(n)||t.tagName.toLowerCase()==="ytm-shorts-lockup-view-model")return!0;let e=t.querySelector('ytd-badge-supported-renderer, [class*="badge"], [class*="chip"]');if(e&&(e.textContent||"").trim().toLowerCase()==="shorts")return!0;let s=H(t);if(s!==null&&s>180)return!1;if(s!==null&&s<=180)return!0;let r=(t.textContent||"").toLowerCase();return/(#shorts\b|#short\b)/.test(r)||X(t),!0}function P(n){let t=[],e=(s,r)=>{let i=s.getAttribute("href")||"",c=i.match(/\/shorts\/([\w-]{11})/)||i.match(/[?&]v=([\w-]{11})/);if(!c)return;let d=Array.from(r.querySelectorAll("a")),o=d.find(l=>{let u=(l.textContent||"").trim();return u.length>3&&!/^\d{1,3}:\d{2}(?::\d{2})?$/.test(u)})||d.find(l=>(l.getAttribute("id")||"").includes("video-title"))||null;t.push({card:r,link:o||s,href:i,videoId:c[1],short:G(i,r)})};return n.querySelectorAll('a[href*="/shorts/"]').forEach(s=>e(s,x(s)||s)),n.querySelectorAll('a[href*="/watch?v="]').forEach(s=>e(s,x(s)||s)),t}function K(){return h("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer").flatMap(n=>P(n))}function I(n){let t=new Set,e=0;for(let s of K())t.has(s.videoId)||n==="shorts"&&!s.short||n==="videos"&&s.short||(t.add(s.videoId),e++);return e}function Q(n,t){let e=new Set,s=[],r=0,i=[],c=h("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer");for(let d of c){let o=p(d);for(let l of P(d)){if(e.has(l.videoId)||t==="shorts"&&!l.short||t==="videos"&&l.short)continue;e.add(l.videoId);let u=(l.card.textContent||"").replace(/\s+/g," ").trim(),m=J(u)||o,f="unknown";m&&(f=m>=n.start&&m<=n.end?"in":"out"),f==="in"?s.push({videoId:l.videoId,title:l.link.getAttribute("title")||l.link.textContent?.trim()||u.slice(0,80)||(l.short?"Short":"Video"),thumbnail:_(l.card),watchedAt:m,range:f,isShort:l.short,href:l.href,el:l.card}):f==="unknown"&&(r++,i.length<5&&!m&&i.push(u.slice(0,300)))}}return{inRange:s,skipped:r,samples:i}}async function Z(n,t,e){let s=h("yt-horizontal-list-renderer");for(let r of s){let i=r.querySelector('a[href*="/shorts/"]')||r,c=p(i);if(c&&c.getTime()<e.start.getTime())continue;let d=r.querySelector("#scroll-container")||r.querySelector("#items")||r,o=0;for(let l=0;l<20;l++){let u=r.querySelectorAll('a[href*="/shorts/"]').length;try{d.scrollLeft=d.scrollWidth,d.scrollTo({left:d.scrollWidth,behavior:"smooth"});let m=r.querySelector('#right-arrow button, [aria-label="Next"]');m&&m.click()}catch{}await b(700);let y=r.querySelectorAll('a[href*="/shorts/"]').length;if(n(I(t)),y===u){if(o++,o>=3)break}else o=0}}}function tt(){return h("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer").map(n=>p(n)).filter(n=>!!n)}function et(n){let t=tt();if(!t.length)return!1;let e=1/0;for(let s of t)s.getTime()<e&&(e=s.getTime());return e<=n.start.getTime()}async function nt(n,t,e){let s=-1,r=0,i=0;for(let c=0;c<35&&(window.scrollTo(0,document.body.scrollHeight),await b(1200),i=I(t),n(i),!et(e));c++){if(i===s){if(r++,r>=3)break}else r=0;s=i}return t!=="videos"&&await Z(n,t,e),i=I(t),i}function F(n){let t=[];return n.querySelectorAll("*").forEach(e=>{let s=e.shadowRoot;s&&t.push(s)}),t}function D(n,t){let e=n.querySelector(t);if(e)return e;for(let s of F(n)){let r=D(s,t);if(r)return r}return null}function L(n,t){let e=Array.from(n.querySelectorAll(t));return F(n).forEach(s=>e.push(...L(s,t))),e}function N(n){return D(n,'button[aria-label*="More actions"], [aria-label="More actions" i], ytd-menu-renderer button, ytd-menu-renderer #top-level-button, [aria-label*="Action menu" i], button[aria-label*="Action menu"]')}function st(n){let t=L(n,"ytd-menu-renderer, ytm-menu-popup-renderer")[0];if(!t)return null;let e=t.shadowRoot;return e?D(e,'button, [role="button"], tp-yt-paper-icon-button, yt-icon-button, [class*="button"]'):null}function ot(n){let t=document.querySelector(`#contents a[href*="/shorts/${n}"], #contents a[href*="v=${n}"]`);if(!t)return{card:null,btn:null};let e=t;for(;e&&e!==document.body;){let s=e.querySelectorAll('a[href*="/watch?v="], a[href*="/shorts/"]');if(s.length>=1&&s.length<=4){let r=x(e)||e,i=N(r)||st(r);if(i)return{card:r,btn:i}}e=e.parentElement}return{card:null,btn:null}}var T=[];function E(n){T.length<5&&T.push(n),console.log("[YTS-Cleaner] "+n)}function rt(){let n=["remove from watch history","remove from history","delete from history"],t=L(document.documentElement,'ytd-menu-service-item-renderer, tp-yt-paper-item, yt-list-item-view-model, [role="menuitem"], [role="option"]');for(let r of t){let i=(r.textContent||"").trim().toLowerCase();if(n.some(c=>i.includes(c)))return r}let e=L(document.documentElement,"*"),s=null;for(let r of e){let i=(r.textContent||"").trim(),c=i.toLowerCase();i.length>0&&i.length<60&&n.some(d=>c.includes(d))&&(!s||i.length<(s.textContent||"").trim().length)&&(s=r)}return s}async function it(n,t){let e=t&&t.isConnected?t:null,s=e?N(e):null;if(!e||!s){let o=ot(n);o.btn&&(o.card&&(e=o.card),s=o.btn)}if(!e)return E(`[${n}] card not found`),!1;if(!s){let o=Array.from(e.querySelectorAll('ytd-menu-renderer, ytm-menu-popup-renderer, [class*="menu"]')).map(l=>l.getAttribute("aria-label")||(l.textContent||"").trim().slice(0,20)).filter(Boolean).slice(0,4);return E(`[${n}] no "More actions" button found. card=${e.tagName} menus=${JSON.stringify(o)}`),!1}try{s.scrollIntoView({block:"center"}),await b(200);let o=s.getBoundingClientRect(),l=o.left+o.width/2,u=o.top+o.height/2;s.dispatchEvent(new PointerEvent("pointerenter",{bubbles:!0,composed:!0,clientX:l,clientY:u})),s.dispatchEvent(new PointerEvent("pointerover",{bubbles:!0,composed:!0,clientX:l,clientY:u})),s.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,composed:!0})),s.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,composed:!0,clientX:l,clientY:u})),await b(300),s.click(),await b(1200)}catch(o){return E(`[${n}] click threw: ${o}`),!1}let r=rt();if(r)return r.click(),await b(900),E(`[${n}] removed OK`),!0;let i=D(document.documentElement,"ytd-popup-container, tp-yt-iron-dropdown, ytm-menu-popup-renderer"),c=i?(i.innerText||"").replace(/\s+/g," ").trim().slice(0,200):"none",d=L(document.documentElement,'[role="menuitem"], [role="option"]').map(o=>(o.textContent||"").trim().slice(0,30)).filter(Boolean);return E(`[${n}] no remove option. popup="${c}" items=${JSON.stringify(d.slice(0,6))}`),document.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),!1}function a(n){return document.getElementById(n)}function q(n){v("ready"),a("ytsc-count-big").textContent="0",a("ytsc-msg").textContent="",a("ytsc-warn").textContent="",a("ytsc-list").innerHTML="",a("ytsc-delete-label").textContent="Delete "+k(),a("ytsc-title").textContent=n}function v(n){g?.querySelectorAll(".ytsc-card")?.forEach(e=>{let s=e;s.classList.toggle("show",s.dataset.card===n)})}function A(n,t){a("ytsc-progress").classList.toggle("show",n),a("ytsc-progress-text").textContent=t}function lt(n){let t=new Date,e=new Date(t);n===1&&e.setHours(0,0,0,0);let s=new Date(e);return s.setDate(e.getDate()-n),s.setHours(0,0,0,0),{start:s,end:e}}function W(n){return n===0?"today":n===1?"yesterday":`the last ${n} days`}function ct(){g=document.createElement("div"),g.id="ytsc-overlay",g.innerHTML=`
    <style>${O}</style>
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
  `,document.documentElement.appendChild(g),a("ytsc-close").addEventListener("click",()=>g?.remove()),a("ytsc-close-done").addEventListener("click",()=>g?.remove()),g.querySelectorAll(".ytsc-mode .ytsc-mode-btn").forEach(n=>{n.addEventListener("click",()=>{w=n.dataset.mode,g.querySelectorAll(".ytsc-mode .ytsc-mode-btn").forEach(t=>t.classList.toggle("active",t===n)),a("ytsc-mode-label").textContent="Delete items watched\u2026",q("Pick a date range")})}),g.querySelectorAll(".ytsc-dates .ytsc-btn").forEach(n=>{n.addEventListener("click",()=>{let t=parseInt(n.dataset.days||"0",10);dt(t)})}),a("ytsc-delete-btn").addEventListener("click",ut),a("ytsc-back").addEventListener("click",()=>{v("ready"),q("Pick a date range")})}var S=[];function at(n,t){let e=[];e.push("URL: "+window.location.href),e.push("mode: "+w);let s=document.querySelectorAll("#contents ytd-video-renderer");if(e.push("ytd-video-renderer count: "+s.length),s.length){let o=s[0],l=Array.from(o.querySelectorAll("a")).slice(0,5).map(u=>(u.getAttribute("href")||"").slice(0,60)).filter(Boolean);e.push("vr#1 connected: "+o.isConnected),e.push("vr#1 in template: "+!!o.closest("template")),e.push("vr#1 links: "+JSON.stringify(l)),e.push("vr#1 html head: "+o.outerHTML.replace(/\s+/g," ").slice(0,250))}else e.push("ytd-video-renderer (anywhere): "+document.querySelectorAll("ytd-video-renderer").length);let r=U();e.push("total title links: "+r.length),e.push("short links: "+r.filter(o=>(o.getAttribute("href")||"").includes("/shorts/")).length),e.push("video links: "+r.filter(o=>!!o.getAttribute("href")&&/[?&]v=/.test(o.getAttribute("href")||"")&&!(o.getAttribute("href")||"").includes("/shorts/")).length),e.push("--- per-section counts ---"),h("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer").forEach((o,l)=>{if(l>=18)return;let u=(o.innerText||"").split(`
`).map(m=>m.trim()).filter(Boolean)[0]||"?",y=p(o);e.push(`  ${l+1}. header="${u.slice(0,30)}" date=${y?y.toISOString().slice(0,10):"?"} shorts=${o.querySelectorAll('a[href*="/shorts/"]').length} videos=${o.querySelectorAll('a[href*="/watch?v="]').length}`)});let i=document.querySelector('#contents a[href*="/watch?v="]');if(i){let o=x(i),l=o?$(o):null;e.push("first watch?v card: "+(o?o.tagName:"null")),e.push("first watch?v section: "+(l?l.tagName:"null")),e.push("first watch?v sectionDateHint: "+(l&&p(l)?p(l).toISOString().slice(0,10):"?")),e.push("first watch?v html head: "+(o?o.outerHTML.replace(/\s+/g," ").slice(0,250):"none"))}else{e.push("--- watch?v card details (section-scoped) ---");let o=0;h("#contents ytd-item-section-renderer, #contents ytm-item-section-renderer").forEach(l=>{if(o>=2)return;let u=l.querySelector('a[href*="/watch?v="]');if(!u)return;let y=x(u)||u;o++;let m=(l.innerText||"").split(`
`).map(f=>f.trim()).filter(Boolean)[0]||"?";e.push(`sec="${m.slice(0,25)}" card=${y.tagName} dur=${H(y)} href=${(u.getAttribute("href")||"").slice(0,30)}`),e.push(`  title=${(y.textContent||"").replace(/\s+/g," ").trim().slice(0,120)}`),e.push(`  html=${y.outerHTML.replace(/\s+/g," ").slice(0,400)}`)})}let c=document.querySelector('#contents a[href*="/shorts/"]');if(c){let o=x(c);if(e.push("first short card tag: "+(o?o.tagName:"null")),o){let l=[],u=o;for(let C=0;C<8&&u;C++)l.push(u.tagName.toLowerCase()),u=u.parentElement;e.push("card ancestor tags: "+JSON.stringify(l));let y=N(o);e.push("card has menu button: "+!!y),y&&e.push("menu button label: "+y.getAttribute("aria-label"));let m=(o.textContent||"").replace(/\s+/g," ").trim();e.push("first card textContent: "+m.slice(0,300));let f=$(o);if(e.push("found section: "+(f?f.tagName:"null")),f){let C=(f.innerText||"").split(`
`).map(j=>j.trim()).filter(Boolean);e.push("section first lines: "+JSON.stringify(C.slice(0,4))),e.push("sectionDateHint result: "+(p(o)?p(o).toString():"null"))}}}let d=[];return document.querySelectorAll("ytd-item-section-renderer, ytm-item-section-renderer").forEach(o=>{let l=(o.innerText||"").split(`
`).filter(u=>u.trim());l.length&&d.length<15&&d.push(l[0].trim().slice(0,60))}),e.push("section headers: "+JSON.stringify(d)),n.forEach((o,l)=>e.push(`sample ${l}: ${o}`)),t&&t.length&&(e.push(`--- in-range (${t.length}) ---`),t.slice(0,30).forEach((o,l)=>{let u=o.watchedAt?o.watchedAt.toISOString().slice(0,10):"?",y=o.el?H(o.el):null;e.push(`  ${l+1}. [${o.isShort?"S":"V"}] ${u} ${y!==null?y+"s":"?"} ${(o.href||"").slice(0,35)} ${o.title.slice(0,40)}`)})),e.join(`
`)}async function dt(n){v("ready"),A(!0,"Loading your history\u2026 (detected so far: 0)");let t=lt(n),e=await nt(y=>{a("ytsc-progress-text").textContent=`Loading your history\u2026 (detected so far: ${y})`},w,t);A(!0,"Analyzing watched dates\u2026");let{inRange:s,skipped:r,samples:i}=Q(t,w);S=s;let c=k(),d=c.charAt(0).toUpperCase()+c.slice(1),o=`${r} ${c} found but their watch date couldn't be read \u2014 skipped to avoid deleting outside your range.`,l=at(i,s);if(s.length===0){v("results"),a("ytsc-count-big").textContent="0",a("ytsc-range-label").textContent=`No ${c} found in ${W(n)}`,a("ytsc-list").innerHTML="",a("ytsc-warn").textContent=r>0?o:"",a("ytsc-delete-btn").style.display="none",a("ytsc-debug").classList.toggle("show",!0),a("ytsc-debug-text").textContent=l,console.log(`[YTS-Cleaner] DEBUG DUMPS:
`+l);return}v("results"),a("ytsc-count-big").textContent=s.length.toString();let u=`${d} watched ${W(n)} (found ${e} total in loaded history)`;if(w==="all"){let y=s.filter(f=>f.isShort).length,m=s.length-y;u+=`<span style="display:block;margin-top:4px;color:#ff4757">${y} Shorts \xB7 ${m} Videos</span>`}a("ytsc-range-label").innerHTML=u,a("ytsc-delete-btn").style.display="block",a("ytsc-delete-label"),a("ytsc-list").innerHTML=s.slice(0,20).map(y=>`
    <div class="ytsc-item">
      <img src="${y.thumbnail}" alt="">
      <div class="ytsc-t">${y.title.replace(/</g,"&lt;")}</div>
    </div>
  `).join(""),a("ytsc-warn").textContent=r>0?o:"",a("ytsc-debug").classList.toggle("show",!0),a("ytsc-debug-text").textContent=l,A(!1,"")}async function ut(){if(S.length===0)return;T.length=0,v("deleting"),a("ytsc-deleting-text").textContent=`Deleting\u2026 0 / ${S.length}`;let n=0,t=0,e=0;for(let s of S)e++,await it(s.videoId,s.el)?n++:t++,a("ytsc-deleting-text").textContent=`Deleting\u2026 ${e} / ${S.length}`,await b(500);v("done"),a("ytsc-done-count").textContent=n.toString(),a("ytsc-done-label").textContent=t>0?`Deleted ${n} ${k()} \xB7 ${t} could not be removed`:`Deleted ${n} ${k()} from your history!`,a("ytsc-done-warn").textContent=t>0?"Debug: "+T.slice(0,5).join(" | "):"",console.log("[YTS-Cleaner] delete log:",JSON.stringify(T,null,2)),a("ytsc-done-label").textContent+=" Refreshing page\u2026",await b(2e3),window.location.reload()}function yt(){let n=document.createElement("style");n.textContent=O,document.head.appendChild(n),g||ct(),v("ready"),q("Pick a date range")}(function(){if(window[R])return;window[R]=!0,console.log("[YTS-Cleaner] content script loaded");let t=()=>{document.querySelectorAll("#contents").length>0?(console.log("[YTS-Cleaner] injecting panel"),yt()):setTimeout(t,800)};setTimeout(t,1e3)})();})();
