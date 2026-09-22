"use strict";(()=>{var M="__ytShortCleanerActive__",R=`
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
`,y=null;function m(e){return new Promise(t=>setTimeout(t,e))}function h(e,t=document){return Array.from(t.querySelectorAll(e))}function W(e){let t=new Date,n=e||"";if(/\bjust now\b/i.test(n)||/\ba moment ago\b/i.test(n))return t;let s=n.match(/(?:watched|viewed|watch|view)?\s*(?:a|an|one|\d+)\s*(second|minute|hour|day|week|month|year)s?\s*ago/i);if(s){let i=s[0],r=s[2].toLowerCase(),a=i.match(/(\d+)/),c=a?parseInt(a[1],10):1,d=new Date(t);return r.startsWith("second")?d.setSeconds(t.getSeconds()-c):r.startsWith("minute")?d.setMinutes(t.getMinutes()-c):r.startsWith("hour")?d.setHours(t.getHours()-c):r.startsWith("day")?d.setDate(t.getDate()-c):r.startsWith("week")?d.setDate(t.getDate()-c*7):r.startsWith("month")?d.setMonth(t.getMonth()-c):r.startsWith("year")&&d.setFullYear(t.getFullYear()-c),d}if(/\byesterday\b/i.test(n)){let i=new Date(t);return i.setDate(t.getDate()-1),i.setHours(12,0,0,0),i}let o=n.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:,?\s+\d{4})?/i);if(o){let i=new Date(o[0]);if(!isNaN(i.getTime()))return i}return null}var A=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],B=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];function w(e){let t=new Date,n=(e||"").trim().toLowerCase();if(!n)return null;if(n.startsWith("today")){let r=new Date(t);return r.setHours(12,0,0,0),r}if(n.startsWith("yesterday")){let r=new Date(t);return r.setDate(t.getDate()-1),r.setHours(12,0,0,0),r}let s=B.findIndex(r=>n.startsWith(r));if(s!==-1){let r=new Date(t),a=(r.getDay()-s+7)%7;return a===0&&(a=7),r.setDate(r.getDate()-a),r.setHours(12,0,0,0),r}let o=n.match(/^(\d{1,2})\s+([a-z]{3,})/);if(o){let r=parseInt(o[1],10),a=A.findIndex(c=>o[2].startsWith(c));if(a!==-1){let c=new Date(t.getFullYear(),a,r,12,0,0);return c.getTime()>t.getTime()&&c.setFullYear(t.getFullYear()-1),c}}let i=n.match(/^([a-z]{3,})\s+(\d{1,2})/);if(i){let r=A.findIndex(a=>i[1].startsWith(a));if(r!==-1){let a=parseInt(i[2],10),c=new Date(t.getFullYear(),r,a,12,0,0);return c.getTime()>t.getTime()&&c.setFullYear(t.getFullYear()-1),c}}return null}function H(e){try{let t=(e||"").replace(/\s+/g," ").trim();if(!t)return null;let n=w(t);if(n)return n;let s=t.split(" ");return n=w(s.slice(0,2).join(" ")),n||(n=w(s.slice(0,4).join(" ")),n)?n:w(s[0])}catch{return null}}function N(e){let t=e;for(;t&&t!==document.body;){let n=t.tagName.toLowerCase();if(n==="ytd-item-section-renderer"||n==="ytm-item-section-renderer"||n==="ytd-continuation-item-renderer")return t;t=t.parentElement}return null}function L(e){let t=N(e);if(!t)return null;try{let s=h('ytd-section-title-renderer, ytd-item-section-header-renderer, #section-title, [id^="section-title"]',t);for(let o of s){let i=(o.textContent||"").replace(/\s+/g," ").trim();if(i&&i.length<60){let r=H(i);if(r)return r}}}catch{}let n=(t.innerText||"").split(`
`).map(s=>s.trim()).filter(Boolean);if(n.length){let s=H(n[0]);if(s)return s}return null}function P(e){let t=e.querySelector("img#img, img.yt-core-image"),n=t?.getAttribute("src")||t?.getAttribute("data-thumb")||"";return n.startsWith("http")?n:""}function E(e,t){if(/\/shorts\//.test(e))return!0;let n=[];return t.querySelectorAll("img").forEach(s=>{let o=s.getAttribute("alt")||"";o&&n.push(o);let i=s.getAttribute("href")||"";i&&n.push(i)}),t.querySelectorAll("[aria-label]").forEach(s=>{let o=s.getAttribute("aria-label")||"";o&&n.push(o)}),n.some(s=>/\bshorts?\b/i.test(s))}function T(e){let t=e;for(;t&&t!==document.body;){let n=t.tagName.toLowerCase();if(n==="ytd-video-renderer"||n==="ytd-grid-video-renderer"||n==="ytd-playlist-video-renderer"||n==="ytd-compact-video-renderer"||n==="ytm-shorts-lockup-view-model")return t;t=t.parentElement}return null}function S(){let e=new Set;return h("#contents a#video-title").forEach(t=>e.add(t)),h("#contents a#video-title-link").forEach(t=>e.add(t)),h('#contents a[href*="/shorts/"]').forEach(t=>e.add(t)),h("#contents ytd-video-renderer #dismissible h3 a").forEach(t=>e.add(t)),h("#contents ytd-grid-video-renderer a").forEach(t=>{(t.getAttribute("href")||"").includes("/shorts/")&&e.add(t)}),Array.from(e)}function F(e){let t=new Set,n=[],s=0,o=[];return S().forEach(r=>{let a=T(r);if(!a)return;let c=r.getAttribute("href")||"",d=c.match(/\/shorts\/([\w-]{11})/)||c.match(/[?&]v=([\w-]{11})/),u=d?d[1]:"";if(!u||t.has(u)||!E(c,a))return;t.add(u);let g=W(a.textContent||"")||L(a),x="unknown";g&&(x=g>=e.start&&g<=e.end?"in":"out"),x==="in"?n.push({videoId:u,title:r.getAttribute("title")||r.textContent?.trim()||a.textContent?.trim().slice(0,80)||"Short",thumbnail:P(a),watchedAt:g,range:x}):x==="unknown"&&(s++,o.length<5&&!g&&o.push((a.textContent||"").replace(/\s+/g," ").trim().slice(0,300)))}),{inRange:n,skipped:s,samples:o}}async function I(e){let t=h("yt-horizontal-list-renderer");for(let n of t){let s=n.querySelector("#scroll-container")||n.querySelector("#items")||n,o=0;for(let i=0;i<20;i++){let r=n.querySelectorAll('a[href*="/shorts/"]').length;try{s.scrollLeft=s.scrollWidth,s.scrollTo({left:s.scrollWidth,behavior:"smooth"});let c=n.querySelector('#right-arrow button, [aria-label="Next"]');c&&c.click()}catch{}await m(1e3);let a=n.querySelectorAll('a[href*="/shorts/"]').length;if(e(S().filter(c=>E(c.getAttribute("href")||"",c)).length),a===r){if(o++,o>=3)break}else o=0}}}async function O(e){let n=-1,s=0,o=0;for(let i=0;i<35;i++){if(window.scrollTo(0,document.body.scrollHeight),await m(1800),o=S().filter(r=>E(r.getAttribute("href")||"",r)).length,e(o),o===n){if(s++,s>=3)break}else s=0;n=o}return await I(e),o=S().filter(i=>E(i.getAttribute("href")||"",i)).length,o}function Y(e){let t=[];return e.querySelectorAll("*").forEach(n=>{let s=n.shadowRoot;s&&t.push(s)}),t}function k(e,t){let n=e.querySelector(t);if(n)return n;for(let s of Y(e)){let o=k(s,t);if(o)return o}return null}function C(e,t){let n=Array.from(e.querySelectorAll(t));return Y(e).forEach(s=>n.push(...C(s,t))),n}function q(e){return k(e,'button[aria-label*="More actions"], [aria-label="More actions" i], ytd-menu-renderer button, ytd-menu-renderer #top-level-button')}function j(e){let t=document.querySelector(`a[href*="/shorts/${e}"], a[href*="v=${e}"]`);return t?T(t):null}var v=[];function p(e){v.length<5&&v.push(e),console.log("[YTS-Cleaner] "+e)}function J(){let e=["remove from watch history","remove from history","delete from history"],t=C(document.documentElement,'ytd-menu-service-item-renderer, tp-yt-paper-item, yt-list-item-view-model, [role="menuitem"], [role="option"]');for(let o of t){let i=(o.textContent||"").trim().toLowerCase();if(e.some(r=>i.includes(r)))return o}let n=C(document.documentElement,"*"),s=null;for(let o of n){let i=(o.textContent||"").trim(),r=i.toLowerCase();i.length>0&&i.length<60&&e.some(a=>r.includes(a))&&(!s||i.length<(s.textContent||"").trim().length)&&(s=o)}return s}async function _(e){let t=j(e);if(!t)return p(`[${e}] card not found`),!1;let n=q(t);if(!n)return p(`[${e}] no "More actions" button found`),!1;try{n.scrollIntoView({block:"center"}),await m(200);let a=n.getBoundingClientRect(),c=a.left+a.width/2,d=a.top+a.height/2;n.dispatchEvent(new PointerEvent("pointerenter",{bubbles:!0,composed:!0,clientX:c,clientY:d})),n.dispatchEvent(new PointerEvent("pointerover",{bubbles:!0,composed:!0,clientX:c,clientY:d})),n.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,composed:!0})),n.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,composed:!0,clientX:c,clientY:d})),await m(300),n.click(),await m(1200)}catch(a){return p(`[${e}] click threw: ${a}`),!1}let s=J();if(s)return s.click(),await m(900),p(`[${e}] removed OK`),!0;let o=k(document.documentElement,"ytd-popup-container, tp-yt-iron-dropdown, ytm-menu-popup-renderer"),i=o?(o.innerText||"").replace(/\s+/g," ").trim().slice(0,200):"none",r=C(document.documentElement,'[role="menuitem"], [role="option"]').map(a=>(a.textContent||"").trim().slice(0,30)).filter(Boolean);return p(`[${e}] no remove option. popup="${i}" items=${JSON.stringify(r.slice(0,6))}`),document.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})),!1}function l(e){return document.getElementById(e)}function z(e){f("ready"),l("ytsc-count-big").textContent="0",l("ytsc-msg").textContent="",l("ytsc-warn").textContent="",l("ytsc-list").innerHTML="",l("ytsc-delete-label").textContent="Delete Shorts",l("ytsc-title").textContent=e}function f(e){y?.querySelectorAll(".ytsc-card")?.forEach(n=>{let s=n;s.classList.toggle("show",s.dataset.card===e)})}function D(e,t){l("ytsc-progress").classList.toggle("show",e),l("ytsc-progress-text").textContent=t}function X(e){let t=new Date,n=new Date(t);e===1&&n.setHours(0,0,0,0);let s=new Date(n);return s.setDate(n.getDate()-e),s.setHours(0,0,0,0),{start:s,end:n}}function $(e){return e===0?"today":e===1?"yesterday":`the last ${e} days`}function U(){y=document.createElement("div"),y.id="ytsc-overlay",y.innerHTML=`
    <style>${R}</style>
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
      <div class="ytsc-label">Delete Shorts watched\u2026</div>
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
  `,document.documentElement.appendChild(y),l("ytsc-close").addEventListener("click",()=>y?.remove()),l("ytsc-close-done").addEventListener("click",()=>y?.remove()),y.querySelectorAll(".ytsc-dates .ytsc-btn").forEach(e=>{e.addEventListener("click",()=>{let t=parseInt(e.dataset.days||"0",10);G(t)})}),l("ytsc-delete-btn").addEventListener("click",K),l("ytsc-back").addEventListener("click",()=>{f("ready"),z("Pick a date range")})}var b=[];function V(e){let t=[];t.push("URL: "+window.location.href),t.push("ytd-video-renderer count: "+document.querySelectorAll("#contents ytd-video-renderer").length);let n=document.querySelector('#contents a[href*="/shorts/"]');if(n){let o=T(n);if(t.push("first short card tag: "+(o?o.tagName:"null")),o){let i=[],r=o;for(let u=0;u<8&&r;u++)i.push(r.tagName.toLowerCase()),r=r.parentElement;t.push("card ancestor tags: "+JSON.stringify(i));let a=q(o);t.push("card has menu button: "+!!a),a&&t.push("menu button label: "+a.getAttribute("aria-label"));let c=(o.textContent||"").replace(/\s+/g," ").trim();t.push("first card textContent: "+c.slice(0,300));let d=N(o);if(t.push("found section: "+(d?d.tagName:"null")),d){let u=(d.innerText||"").split(`
`).map(g=>g.trim()).filter(Boolean);t.push("section first lines: "+JSON.stringify(u.slice(0,4))),t.push("sectionDateHint result: "+(L(o)?L(o).toString():"null"))}}}let s=[];return document.querySelectorAll("ytd-item-section-renderer, ytm-item-section-renderer").forEach(o=>{let i=(o.innerText||"").split(`
`).filter(r=>r.trim());i.length&&s.length<15&&s.push(i[0].trim().slice(0,60))}),t.push("section headers: "+JSON.stringify(s)),e.forEach((o,i)=>t.push(`sample ${i}: ${o}`)),t.join(`
`)}async function G(e){f("ready"),D(!0,"Loading your history\u2026 (detected so far: 0)");let t=!1,n=await O(d=>{l("ytsc-progress-text").textContent=`Loading your history\u2026 (detected so far: ${d})`});D(!0,"Analyzing watched dates\u2026");let s=X(e),{inRange:o,skipped:i,samples:r}=F(s);b=o;let a=`${i} Short(s) found but their watch date couldn't be read \u2014 skipped to avoid deleting outside your range.`,c=V(r);if(o.length===0){f("results"),l("ytsc-count-big").textContent="0",l("ytsc-range-label").textContent=`No Shorts found in ${$(e)}`,l("ytsc-list").innerHTML="",l("ytsc-warn").textContent=i>0?a:"",l("ytsc-delete-btn").style.display="none",l("ytsc-debug").classList.toggle("show",i>0),l("ytsc-debug-text").textContent=c,console.log(`[YTS-Cleaner] DEBUG DUMPS:
`+c);return}f("results"),l("ytsc-count-big").textContent=o.length.toString(),l("ytsc-range-label").textContent=`Shorts watched ${$(e)} (found ${n} total in loaded history)`,l("ytsc-delete-btn").style.display="block",l("ytsc-delete-label"),l("ytsc-list").innerHTML=o.slice(0,20).map(d=>`
    <div class="ytsc-item">
      <img src="${d.thumbnail}" alt="">
      <div class="ytsc-t">${d.title.replace(/</g,"&lt;")}</div>
    </div>
  `).join(""),l("ytsc-warn").textContent=i>0?a:"",l("ytsc-debug").classList.toggle("show",i>0),l("ytsc-debug-text").textContent=c,D(!1,"")}async function K(){if(b.length===0)return;v.length=0,f("deleting"),l("ytsc-deleting-text").textContent=`Deleting\u2026 0 / ${b.length}`;let e=0,t=0,n=0;for(let s of b)n++,await _(s.videoId)?e++:t++,l("ytsc-deleting-text").textContent=`Deleting\u2026 ${n} / ${b.length}`,await m(500);f("done"),l("ytsc-done-count").textContent=e.toString(),l("ytsc-done-label").textContent=t>0?`Deleted ${e} Shorts \xB7 ${t} could not be removed`:`Deleted ${e} Shorts from your history!`,l("ytsc-done-warn").textContent=t>0?"Debug: "+v.slice(0,5).join(" | "):"",console.log("[YTS-Cleaner] delete log:",JSON.stringify(v,null,2))}function Q(){let e=document.createElement("style");e.textContent=R,document.head.appendChild(e),y||U(),f("ready"),z("Pick a date range")}(function(){if(window[M])return;window[M]=!0,console.log("[YTS-Cleaner] content script loaded");let t=()=>{document.querySelectorAll("#contents").length>0?(console.log("[YTS-Cleaner] injecting panel"),Q()):setTimeout(t,800)};setTimeout(t,1e3)})();})();
