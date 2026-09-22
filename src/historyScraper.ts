const ACTIVE_FLAG = '__ytShortCleanerActive__';

const STYLES = `
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
`;

interface ScannedShort {
  videoId: string;
  title: string;
  thumbnail: string;
  watchedAt: Date | null;
  range: 'in' | 'out' | 'unknown';
}

interface DateRange {
  start: Date;
  end: Date;
}

let overlay: HTMLElement | null = null;

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function $$(sel: string, root: ParentNode = document): Element[] {
  return Array.from(root.querySelectorAll(sel));
}

function parseRelativeTime(text: string): Date | null {
  const now = new Date();
  const t = text || '';
  if (/\bjust now\b/i.test(t) || /\ba moment ago\b/i.test(t)) return now;

  const rel = t.match(/(?:watched|viewed|watch|view)?\s*(?:a|an|one|\d+)\s*(second|minute|hour|day|week|month|year)s?\s*ago/i);
  if (rel) {
    const whole = rel[0];
    const unit = rel[2].toLowerCase();
    const numMatch = whole.match(/(\d+)/);
    const num = numMatch ? parseInt(numMatch[1], 10) : 1;
    const d = new Date(now);
    if (unit.startsWith('second')) d.setSeconds(now.getSeconds() - num);
    else if (unit.startsWith('minute')) d.setMinutes(now.getMinutes() - num);
    else if (unit.startsWith('hour')) d.setHours(now.getHours() - num);
    else if (unit.startsWith('day')) d.setDate(now.getDate() - num);
    else if (unit.startsWith('week')) d.setDate(now.getDate() - num * 7);
    else if (unit.startsWith('month')) d.setMonth(now.getMonth() - num);
    else if (unit.startsWith('year')) d.setFullYear(now.getFullYear() - num);
    return d;
  }

  if (/\byesterday\b/i.test(t)) {
    const y = new Date(now);
    y.setDate(now.getDate() - 1);
    y.setHours(12, 0, 0, 0);
    return y;
  }

  const abs = t.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:,?\s+\d{4})?/i);
  if (abs) {
    const d = new Date(abs[0]);
    if (!isNaN(d.getTime())) return d;
  }

  return null;
}

const MONTH_ABBR = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function headerToDate(headerText: string): Date | null {
  const now = new Date();
  const h = (headerText || '').trim().toLowerCase();
  if (!h) return null;

  if (h.startsWith('today')) {
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    return d;
  }
  if (h.startsWith('yesterday')) {
    const d = new Date(now);
    d.setDate(now.getDate() - 1);
    d.setHours(12, 0, 0, 0);
    return d;
  }

  const wd = WEEKDAYS.findIndex(d => h.startsWith(d));
  if (wd !== -1) {
    const d = new Date(now);
    let diff = (d.getDay() - wd + 7) % 7;
    if (diff === 0) diff = 7;
    d.setDate(d.getDate() - diff);
    d.setHours(12, 0, 0, 0);
    return d;
  }

  // "7 Sept" / "7 September" (day-first) and "Sept 7" (month-first)
  const m1 = h.match(/^(\d{1,2})\s+([a-z]{3,})/);
  if (m1) {
    const day = parseInt(m1[1], 10);
    const mi = MONTH_ABBR.findIndex(m => m1[2].startsWith(m));
    if (mi !== -1) {
      const d = new Date(now.getFullYear(), mi, day, 12, 0, 0);
      if (d.getTime() > now.getTime()) d.setFullYear(now.getFullYear() - 1);
      return d;
    }
  }
  const m2 = h.match(/^([a-z]{3,})\s+(\d{1,2})/);
  if (m2) {
    const mi = MONTH_ABBR.findIndex(m => m2[1].startsWith(m));
    if (mi !== -1) {
      const day = parseInt(m2[2], 10);
      const d = new Date(now.getFullYear(), mi, day, 12, 0, 0);
      if (d.getTime() > now.getTime()) d.setFullYear(now.getFullYear() - 1);
      return d;
    }
  }

  return null;
}

function dateFromText(t: string): Date | null {
  try {
    const full = (t || '').replace(/\s+/g, ' ').trim();
    if (!full) return null;
    let d = headerToDate(full);
    if (d) return d;
    const words = full.split(' ');
    d = headerToDate(words.slice(0, 2).join(' '));
    if (d) return d;
    d = headerToDate(words.slice(0, 4).join(' '));
    if (d) return d;
    return headerToDate(words[0]);
  } catch (e) {
    return null;
  }
}

function findSection(el: Element): Element | null {
  let section: Element | null = el;
  while (section && section !== document.body) {
    const t = section.tagName.toLowerCase();
    if (
      t === 'ytd-item-section-renderer' ||
      t === 'ytm-item-section-renderer' ||
      t === 'ytd-continuation-item-renderer'
    ) {
      return section;
    }
    section = section.parentElement;
  }
  return null;
}

function sectionDateHint(el: Element): Date | null {
  const section = findSection(el);
  if (!section) return null;

  try {
    // Only genuine section header elements, never generic #title/h2/h3 (which can be card titles).
    const headerCandidates = $$(
      'ytd-section-title-renderer, ytd-item-section-header-renderer, #section-title, [id^="section-title"]',
      section
    );
    for (const c of headerCandidates) {
      const t = (c.textContent || '').replace(/\s+/g, ' ').trim();
      if (t && t.length < 60) {
        const d = dateFromText(t);
        if (d) return d;
      }
    }
  } catch (e) {
    /* ignore */
  }

  // Fallback: the first line of the section's visible text is the date header.
  const lines = ((section as HTMLElement).innerText || '').split('\n').map(x => x.trim()).filter(Boolean);
  if (lines.length) {
    const d = dateFromText(lines[0]);
    if (d) return d;
  }
  return null;
}

function getThumbnail(root: Element): string {
  const img = root.querySelector<HTMLImageElement>('img#img, img.yt-core-image');
  const src = img?.getAttribute('src') || img?.getAttribute('data-thumb') || '';
  return src.startsWith('http') ? src : '';
}

function isShortLike(href: string, root: Element): boolean {
  if (/\/shorts\//.test(href)) return true;
  const labels: string[] = [];
  root.querySelectorAll('img').forEach(img => {
    const alt = img.getAttribute('alt') || '';
    if (alt) labels.push(alt);
    const h = img.getAttribute('href') || '';
    if (h) labels.push(h);
  });
  root.querySelectorAll('[aria-label]').forEach(n => {
    const a = n.getAttribute('aria-label') || '';
    if (a) labels.push(a);
  });
  return labels.some(l => /\bshorts?\b/i.test(l));
}

function findEntryRoot(link: Element): Element | null {
  let el: Element | null = link;
  while (el && el !== document.body) {
    const tag = el.tagName.toLowerCase();
    if (
      tag === 'ytd-video-renderer' ||
      tag === 'ytd-grid-video-renderer' ||
      tag === 'ytd-playlist-video-renderer' ||
      tag === 'ytd-compact-video-renderer' ||
      tag === 'ytm-shorts-lockup-view-model'
    ) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

function findTitleLinks(): Element[] {
  const links = new Set<Element>();
  $$('#contents a#video-title').forEach(l => links.add(l));
  $$('#contents a#video-title-link').forEach(l => links.add(l));
  $$('#contents a[href*="/shorts/"]').forEach(l => links.add(l));
  $$('#contents ytd-video-renderer #dismissible h3 a').forEach(l => links.add(l));
  $$('#contents ytd-grid-video-renderer a').forEach(l => {
    if ((l.getAttribute('href') || '').includes('/shorts/')) links.add(l);
  });
  return Array.from(links);
}

function scanShorts(r: DateRange): { inRange: ScannedShort[]; skipped: number; samples: string[] } {
  const seen = new Set<string>();
  const inRange: ScannedShort[] = [];
  let skipped = 0;
  const samples: string[] = [];

  const links = findTitleLinks();

  links.forEach(link => {
    const root = findEntryRoot(link);
    if (!root) return;

    const href = link.getAttribute('href') || '';
    const idMatch = href.match(/\/shorts\/([\w-]{11})/) || href.match(/[?&]v=([\w-]{11})/);
    const videoId = idMatch ? idMatch[1] : '';

    if (!videoId || seen.has(videoId)) return;
    if (!isShortLike(href, root)) return;
    seen.add(videoId);

    const watchedAt = parseRelativeTime(root.textContent || '') || sectionDateHint(root);

    let range: 'in' | 'out' | 'unknown' = 'unknown';
    if (watchedAt) {
      range = watchedAt >= r.start && watchedAt <= r.end ? 'in' : 'out';
    }

    if (range === 'in') {
      inRange.push({
        videoId,
        title: link.getAttribute('title') || link.textContent?.trim() || root.textContent?.trim().slice(0, 80) || 'Short',
        thumbnail: getThumbnail(root),
        watchedAt,
        range
      });
    } else if (range === 'unknown') {
      skipped++;
      if (samples.length < 5 && !watchedAt) {
        samples.push((root.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 300));
      }
    }
  });

  return { inRange, skipped, samples };
}

async function autoScrollShelves(onProgress: (found: number) => void): Promise<void> {
  const shelves = $$('yt-horizontal-list-renderer');
  for (const shelf of shelves) {
    const scroller = (
      shelf.querySelector('#scroll-container') ||
      shelf.querySelector('#items') ||
      shelf
    ) as HTMLElement;
    let stall = 0;
    for (let i = 0; i < 20; i++) {
      const before = shelf.querySelectorAll('a[href*="/shorts/"]').length;
      try {
        scroller.scrollLeft = scroller.scrollWidth;
        scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'smooth' });
        const arrow = shelf.querySelector('#right-arrow button, [aria-label="Next"]') as HTMLElement | null;
        if (arrow) arrow.click();
      } catch (e) { /* ignore */ }
      await wait(1000);
      const after = shelf.querySelectorAll('a[href*="/shorts/"]').length;
      onProgress(findTitleLinks().filter(l => isShortLike(l.getAttribute('href') || '', l)).length);
      if (after === before) { stall++; if (stall >= 3) break; } else stall = 0;
    }
  }
}

async function autoScroll(onProgress: (found: number) => void): Promise<number> {
  const MAX_SCROLLS = 35;
  let lastCount = -1;
  let stallCount = 0;
  let found = 0;

  // Phase 1: vertical scroll to load day sections
  for (let i = 0; i < MAX_SCROLLS; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await wait(1800);

    found = findTitleLinks().filter(l => isShortLike(l.getAttribute('href') || '', l)).length;
    onProgress(found);
    if (found === lastCount) { stallCount++; if (stallCount >= 3) break; } else stallCount = 0;
    lastCount = found;
  }

  // Phase 2: horizontal scroll on each reel shelf to load all shorts
  await autoScrollShelves(onProgress);

  found = findTitleLinks().filter(l => isShortLike(l.getAttribute('href') || '', l)).length;
  return found;
}

function shadowRoots(node: ParentNode): ShadowRoot[] {
  const roots: ShadowRoot[] = [];
  node.querySelectorAll('*').forEach(el => {
    const sr = (el as HTMLElement & { shadowRoot?: ShadowRoot | null }).shadowRoot;
    if (sr) roots.push(sr);
  });
  return roots;
}

function deepFind(root: ParentNode, sel: string): HTMLElement | null {
  const direct = root.querySelector(sel);
  if (direct) return direct as HTMLElement;
  for (const sr of shadowRoots(root)) {
    const hit = deepFind(sr, sel);
    if (hit) return hit;
  }
  return null;
}

function deepCollect(root: ParentNode, sel: string): Element[] {
  const out: Element[] = Array.from(root.querySelectorAll(sel));
  shadowRoots(root).forEach(sr => out.push(...deepCollect(sr, sel)));
  return out;
}

function findMenuButton(root: Element): HTMLElement | null {
  return deepFind(
    root,
    'button[aria-label*="More actions"], [aria-label="More actions" i], ytd-menu-renderer button, ytd-menu-renderer #top-level-button'
  );
}

function findEntryRootByVideoId(videoId: string): Element | null {
  const link = document.querySelector(`a[href*="/shorts/${videoId}"], a[href*="v=${videoId}"]`);
  return link ? findEntryRoot(link) : null;
}

const deleteLog: string[] = [];

function logDelete(msg: string) {
  if (deleteLog.length < 5) deleteLog.push(msg);
  console.log('[YTS-Cleaner] ' + msg);
}

function findRemoveOption(): HTMLElement | null {
  const targets = ['remove from watch history', 'remove from history', 'delete from history'];

  // Fast: known menu item types
  const fast = deepCollect(document.documentElement, 'ytd-menu-service-item-renderer, tp-yt-paper-item, yt-list-item-view-model, [role="menuitem"], [role="option"]');
  for (const el of fast) {
    const t = (el.textContent || '').trim().toLowerCase();
    if (targets.some(tg => t.includes(tg))) return el as HTMLElement;
  }

  // Slow: any element with the exact short text
  const all = deepCollect(document.documentElement, '*');
  let best: HTMLElement | null = null;
  for (const el of all) {
    const raw = (el.textContent || '').trim();
    const t = raw.toLowerCase();
    if (raw.length > 0 && raw.length < 60 && targets.some(tg => t.includes(tg))) {
      if (!best || raw.length < (best.textContent || '').trim().length) best = el as HTMLElement;
    }
  }
  return best;
}

async function removeWatchHistoryItem(videoId: string): Promise<boolean> {
  const root = findEntryRootByVideoId(videoId);
  if (!root) {
    logDelete(`[${videoId}] card not found`);
    return false;
  }

  const menuBtn = findMenuButton(root);
  if (!menuBtn) {
    logDelete(`[${videoId}] no "More actions" button found`);
    return false;
  }

  try {
    menuBtn.scrollIntoView({ block: 'center' });
    await wait(200);
    const rect = menuBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    menuBtn.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, composed: true, clientX: cx, clientY: cy }));
    menuBtn.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, composed: true, clientX: cx, clientY: cy }));
    menuBtn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
    menuBtn.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, composed: true, clientX: cx, clientY: cy }));
    await wait(300);
    menuBtn.click();
    await wait(1200);
  } catch (e) {
    logDelete(`[${videoId}] click threw: ${e}`);
    return false;
  }

  // Try to find the remove option anywhere on the page
  const removeOpt = findRemoveOption();
  if (removeOpt) {
    removeOpt.click();
    await wait(900);
    logDelete(`[${videoId}] removed OK`);
    return true;
  }

  // Diagnostics on failure
  const popup = deepFind(document.documentElement, 'ytd-popup-container, tp-yt-iron-dropdown, ytm-menu-popup-renderer');
  const popupText = popup ? ((popup as HTMLElement).innerText || '').replace(/\s+/g, ' ').trim().slice(0, 200) : 'none';
  const menuItems = deepCollect(document.documentElement, '[role="menuitem"], [role="option"]')
    .map(e => (e.textContent || '').trim().slice(0, 30))
    .filter(Boolean);

  logDelete(
    `[${videoId}] no remove option. popup="${popupText}" items=${JSON.stringify(menuItems.slice(0, 6))}`
  );
  document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  return false;
}

// ---------- UI ----------

function el(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}

function on(title: string) {
  showCard('ready');
  el('ytsc-count-big').textContent = '0';
  el('ytsc-msg').textContent = '';
  el('ytsc-warn').textContent = '';
  el('ytsc-list').innerHTML = '';
  el('ytsc-delete-label').textContent = 'Delete Shorts';
  el('ytsc-title').textContent = title;
}

function showCard(name: string) {
  const cards = overlay?.querySelectorAll('.ytsc-card');
  cards?.forEach(c => {
    const card = c as HTMLElement;
    card.classList.toggle('show', card.dataset.card === name);
  });
}

function showProgress(show: boolean, text: string) {
  el('ytsc-progress').classList.toggle('show', show);
  el('ytsc-progress-text').textContent = text;
}

function getRange(days: number): DateRange {
  const now = new Date();
  const end = new Date(now);
  if (days === 1) {
    end.setHours(0, 0, 0, 0);
  }
  const start = new Date(end);
  start.setDate(end.getDate() - days);
  start.setHours(0, 0, 0, 0);
  return { start, end };
}

function rangeLabel(days: number): string {
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return `the last ${days} days`;
}

function buildOverlay(): void {
  overlay = document.createElement('div');
  overlay.id = 'ytsc-overlay';
  overlay.innerHTML = `
    <style>${STYLES}</style>
    <div class="ytsc-head">
      <div class="ytsc-title" id="ytsc-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="3" fill="#ff4757"/>
          <path d="M10 9l5 3-5 3V9z" fill="#fff"/>
        </svg>
        YouTube Shorts Cleaner
      </div>
      <button class="ytsc-close" id="ytsc-close" title="Close">✕</button>
    </div>

    <div class="ytsc-card" data-card="ready">
      <div class="ytsc-label">Delete Shorts watched…</div>
      <div class="ytsc-dates">
        <button class="ytsc-btn" data-days="0">Today</button>
        <button class="ytsc-btn" data-days="1">Yesterday</button>
        <button class="ytsc-btn" data-days="3">Last 3 Days</button>
        <button class="ytsc-btn" data-days="7">Last 7 Days</button>
        <button class="ytsc-btn" data-days="30">Last 30 Days</button>
      </div>
      <div class="ytsc-progress" id="ytsc-progress">
        <div class="ytsc-spinner"></div>
        <span id="ytsc-progress-text">Loading…</span>
      </div>
    </div>

    <div class="ytsc-card" data-card="results">
      <div class="ytsc-count-big" id="ytsc-count-big">0</div>
      <div class="ytsc-label" style="text-align:center" id="ytsc-range-label">Shorts found</div>
      <div class="ytsc-list" id="ytsc-list"></div>
      <div class="ytsc-warn" id="ytsc-warn"></div>
      <div class="ytsc-debug" id="ytsc-debug">
        <div class="ytsc-label">Raw page debug info — copy &amp; paste this back to the developer</div>
        <pre id="ytsc-debug-text"></pre>
      </div>
      <button class="ytsc-btn ytsc-danger" id="ytsc-delete-btn">Delete Shorts</button>
      <button class="ytsc-btn ytsc-ghost" id="ytsc-back">Choose Another Range</button>
    </div>

    <div class="ytsc-card" data-card="deleting">
      <div class="ytsc-progress show" id="ytsc-progress-deleting">
        <div class="ytsc-spinner"></div>
        <span id="ytsc-deleting-text">Deleting…</span>
      </div>
    </div>

    <div class="ytsc-card" data-card="done">
      <div class="ytsc-count-big" id="ytsc-done-count">0</div>
      <div class="ytsc-label" style="text-align:center" id="ytsc-done-label">Done!</div>
      <div class="ytsc-warn" id="ytsc-done-warn"></div>
      <button class="ytsc-btn ytsc-ghost" id="ytsc-close-done">Close</button>
    </div>
  `;

  document.documentElement.appendChild(overlay);

  el('ytsc-close').addEventListener('click', () => overlay?.remove());
  el('ytsc-close-done').addEventListener('click', () => overlay?.remove());

  overlay.querySelectorAll('.ytsc-dates .ytsc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const days = parseInt((btn as HTMLElement).dataset.days || '0', 10);
      runScan(days);
    });
  });

  el('ytsc-delete-btn').addEventListener('click', runDelete);
  el('ytsc-back').addEventListener('click', () => {
    showCard('ready');
    on('Pick a date range');
  });
}

let pendingTargets: ScannedShort[] = [];

function buildDebugDump(samples: string[]): string {
  const lines: string[] = [];
  lines.push('URL: ' + window.location.href);
  lines.push('ytd-video-renderer count: ' + document.querySelectorAll('#contents ytd-video-renderer').length);

  const firstShort = document.querySelector('#contents a[href*="/shorts/"]');
  if (firstShort) {
    const root = findEntryRoot(firstShort);
    lines.push('first short card tag: ' + (root ? root.tagName : 'null'));
    if (root) {
      const chain: string[] = [];
      let p: Element | null = root;
      for (let i = 0; i < 8 && p; i++) {
        chain.push(p.tagName.toLowerCase());
        p = p.parentElement;
      }
      lines.push('card ancestor tags: ' + JSON.stringify(chain));
      const menuBtn = findMenuButton(root);
      lines.push('card has menu button: ' + !!menuBtn);
      if (menuBtn) lines.push('menu button label: ' + menuBtn.getAttribute('aria-label'));
      const txt = (root.textContent || '').replace(/\s+/g, ' ').trim();
      lines.push('first card textContent: ' + txt.slice(0, 300));

      const section = findSection(root);
      lines.push('found section: ' + (section ? section.tagName : 'null'));
      if (section) {
        const sLines = ((section as HTMLElement).innerText || '').split('\n').map(x => x.trim()).filter(Boolean);
        lines.push('section first lines: ' + JSON.stringify(sLines.slice(0, 4)));
        lines.push('sectionDateHint result: ' + (sectionDateHint(root) ? sectionDateHint(root)!.toString() : 'null'));
      }
    }
  }

  const headers: string[] = [];
  document.querySelectorAll('ytd-item-section-renderer, ytm-item-section-renderer').forEach(s => {
    const h = ((s as HTMLElement).innerText || '').split('\n').filter(x => x.trim());
    if (h.length && headers.length < 15) headers.push(h[0].trim().slice(0, 60));
  });
  lines.push('section headers: ' + JSON.stringify(headers));

  samples.forEach((s, i) => lines.push(`sample ${i}: ${s}`));
  return lines.join('\n');
}

async function runScan(days: number) {
  showCard('ready');
  showProgress(true, `Loading your history… (detected so far: 0)`);
  let firstStall = false;

  const found = await autoScroll(n => {
    el('ytsc-progress-text').textContent = `Loading your history… (detected so far: ${n})`;
  });

  showProgress(true, 'Analyzing watched dates…');
  const r = getRange(days);
  const { inRange, skipped, samples } = scanShorts(r);

  pendingTargets = inRange;

  const warnBase = `${skipped} Short(s) found but their watch date couldn't be read — skipped to avoid deleting outside your range.`;
  const debugText = buildDebugDump(samples);

  if (inRange.length === 0) {
    showCard('results');
    el('ytsc-count-big').textContent = '0';
    el('ytsc-range-label').textContent = `No Shorts found in ${rangeLabel(days)}`;
    el('ytsc-list').innerHTML = '';
    el('ytsc-warn').textContent = skipped > 0 ? warnBase : '';
    el('ytsc-delete-btn').style.display = 'none';
    el('ytsc-debug').classList.toggle('show', skipped > 0);
    el('ytsc-debug-text').textContent = debugText;
    console.log('[YTS-Cleaner] DEBUG DUMPS:\n' + debugText);
    return;
  }

  showCard('results');
  el('ytsc-count-big').textContent = inRange.length.toString();
  el('ytsc-range-label').textContent = `Shorts watched ${rangeLabel(days)} (found ${found} total in loaded history)`;
  el('ytsc-delete-btn').style.display = 'block';
  el('ytsc-delete-label');

  el('ytsc-list').innerHTML = inRange.slice(0, 20).map(s => `
    <div class="ytsc-item">
      <img src="${s.thumbnail}" alt="">
      <div class="ytsc-t">${s.title.replace(/</g, '&lt;')}</div>
    </div>
  `).join('');

  el('ytsc-warn').textContent = skipped > 0 ? warnBase : '';
  el('ytsc-debug').classList.toggle('show', skipped > 0);
  el('ytsc-debug-text').textContent = debugText;

  showProgress(false, '');
}

async function runDelete() {
  if (pendingTargets.length === 0) return;

  deleteLog.length = 0;

  showCard('deleting');
  el('ytsc-deleting-text').textContent = `Deleting… 0 / ${pendingTargets.length}`;

  let success = 0;
  let failed = 0;
  let attempted = 0;

  for (const t of pendingTargets) {
    attempted++;
    const ok = await removeWatchHistoryItem(t.videoId);
    if (ok) success++;
    else failed++;
    el('ytsc-deleting-text').textContent = `Deleting… ${attempted} / ${pendingTargets.length}`;
    await wait(500);
  }

  showCard('done');
  el('ytsc-done-count').textContent = success.toString();
  el('ytsc-done-label').textContent = failed > 0
    ? `Deleted ${success} Shorts · ${failed} could not be removed`
    : `Deleted ${success} Shorts from your history!`;
  el('ytsc-done-warn').textContent = failed > 0
    ? 'Debug: ' + deleteLog.slice(0, 5).join(' | ')
    : '';
  console.log('[YTS-Cleaner] delete log:', JSON.stringify(deleteLog, null, 2));
}

function init() {
  const styleTag = document.createElement('style');
  styleTag.textContent = STYLES;
  document.head.appendChild(styleTag);

  if (!overlay) buildOverlay();
  showCard('ready');
  on('Pick a date range');
}

(function main() {
  if ((window as any)[ACTIVE_FLAG]) return;
  (window as any)[ACTIVE_FLAG] = true;

  console.log('[YTS-Cleaner] content script loaded');

  const tryInit = () => {
    const hasContent = document.querySelectorAll('#contents').length > 0;
    if (hasContent) {
      console.log('[YTS-Cleaner] injecting panel');
      init();
    } else {
      setTimeout(tryInit, 800);
    }
  };

  setTimeout(tryInit, 1000);
})();