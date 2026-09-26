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
`;

interface ScannedItem {
  videoId: string;
  title: string;
  thumbnail: string;
  watchedAt: Date | null;
  range: 'in' | 'out' | 'unknown';
  isShort: boolean;
  href: string;
  el: HTMLElement | null;
}

type Mode = 'shorts' | 'videos' | 'all';

interface DateRange {
  start: Date;
  end: Date;
}

let overlay: HTMLElement | null = null;
let currentMode: Mode = 'shorts';

function modeNoun(): string {
  return currentMode === 'shorts' ? 'Shorts' : currentMode === 'videos' ? 'Videos' : 'items';
}

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
  $$('#contents a[href*="/watch?v="]').forEach(l => links.add(l));
  $$('#contents ytd-video-renderer #dismissible h3 a').forEach(l => links.add(l));
  $$('#contents ytd-grid-video-renderer a').forEach(l => {
    if ((l.getAttribute('href') || '').includes('/shorts/')) links.add(l);
  });
  return Array.from(links);
}

function timecodeToSeconds(a: number, b: number, c: number, hasHours: boolean): number {
  return hasHours ? a * 3600 + b * 60 + c : a * 60 + b;
}

function cardDurationSeconds(card: Element): number | null {
  const preferred = 'ytd-thumbnail-overlay-time-status-renderer, [class*="time-status"], .badge-shape-wiz__text, span[class*="badge"], [class*="time"]';
  for (const el of card.querySelectorAll<HTMLElement>(preferred)) {
    const t = (el.textContent || '').trim();
    const m = t.match(/^(\d{1,3}):(\d{2})(?::(\d{2}))?$/);
    if (m) return timecodeToSeconds(parseInt(m[1], 10), parseInt(m[2], 10), m[3] ? parseInt(m[3], 10) : 0, !!m[3]);
  }
  let best: Element | null = null;
  for (const el of card.querySelectorAll<HTMLElement>('*')) {
    const t = (el.textContent || '').trim();
    if (t.length > 0 && t.length < 10 && /^\d{1,3}:\d{2}(?::\d{2})?$/.test(t)) {
      if (!best || t.length < (best.textContent || '').trim().length) best = el;
    }
  }
  if (best) {
    const m = (best.textContent || '').trim().match(/^(\d{1,3}):(\d{2})(?::(\d{2}))?$/);
    if (m) return timecodeToSeconds(parseInt(m[1], 10), parseInt(m[2], 10), m[3] ? parseInt(m[3], 10) : 0, !!m[3]);
  }
  return null;
}

function isPortraitThumb(card: Element): boolean {
  const img = card.querySelector<HTMLImageElement>('img#img, img.yt-core-image');
  const pairs: Array<[number, number]> = [];
  if (img) {
    if (img.width && img.height) pairs.push([img.width, img.height]);
    const aw = parseInt(img.getAttribute('width') || '0', 10);
    const ah = parseInt(img.getAttribute('height') || '0', 10);
    if (aw && ah) pairs.push([aw, ah]);
  }
  if (pairs.some(([w, h]) => h > w)) return true;
  const tn = card.querySelector('ytd-thumbnail');
  if (tn) {
    const st = ((tn as HTMLElement).getAttribute('style') || '') + ' ' + tn.className.toString();
    if (/aspect-ratio\s*:\s*9\s*\/\s*16|\bwin%-\d{2,3}x\d{2,3}\b|portrait/i.test(st)) return true;
  }
  return false;
}

function isShortItem(href: string, card: Element): boolean {
  if (/\/shorts\//.test(href)) return true;
  if (card.tagName.toLowerCase() === 'ytm-shorts-lockup-view-model') return true;
  const badge = card.querySelector('ytd-badge-supported-renderer, [class*="badge"], [class*="chip"]');
  if (badge && (badge.textContent || '').trim().toLowerCase() === 'shorts') return true;
  const dur = cardDurationSeconds(card);
  if (dur !== null && dur > 180) return false;
  if (dur !== null && dur <= 180) return true;
  const txt = (card.textContent || '').toLowerCase();
  if (/(#shorts\b|#short\b)/.test(txt)) return true;
  if (isPortraitThumb(card)) return true;
  return true;
}

interface SectionItem {
  card: Element;
  link: Element;
  href: string;
  videoId: string;
  short: boolean;
}

function collectSectionItemsIn(section: Element): SectionItem[] {
  const out: SectionItem[] = [];
  const push = (a: Element, card: Element) => {
    const href = a.getAttribute('href') || '';
    const m = href.match(/\/shorts\/([\w-]{11})/) || href.match(/[?&]v=([\w-]{11})/);
    if (!m) return;
    const anchors = Array.from(card.querySelectorAll<HTMLElement>('a'));
    const titleLink = anchors.find(x => {
      const t = (x.textContent || '').trim();
      return t.length > 3 && !/^\d{1,3}:\d{2}(?::\d{2})?$/.test(t);
    }) || anchors.find(x => (x.getAttribute('id') || '').includes('video-title')) || null;
    out.push({ card, link: titleLink || a, href, videoId: m[1], short: isShortItem(href, card) });
  };
  section.querySelectorAll<HTMLElement>('a[href*="/shorts/"]').forEach(a => push(a, findEntryRoot(a) || a));
  section.querySelectorAll<HTMLElement>('a[href*="/watch?v="]').forEach(a => push(a, findEntryRoot(a) || a));
  return out;
}

function collectSectionItems(): SectionItem[] {
  return $$('#contents ytd-item-section-renderer, #contents ytm-item-section-renderer').flatMap(s => collectSectionItemsIn(s));
}

function countMatches(mode: Mode): number {
  const seen = new Set<string>();
  let n = 0;
  for (const it of collectSectionItems()) {
    if (seen.has(it.videoId)) continue;
    if (mode === 'shorts' && !it.short) continue;
    if (mode === 'videos' && it.short) continue;
    seen.add(it.videoId);
    n++;
  }
  return n;
}

function scanItems(r: DateRange, mode: Mode): { inRange: ScannedItem[]; skipped: number; samples: string[] } {
  const seen = new Set<string>();
  const inRange: ScannedItem[] = [];
  let skipped = 0;
  const samples: string[] = [];

  const sections = $$('#contents ytd-item-section-renderer, #contents ytm-item-section-renderer');

  for (const section of sections) {
    const sectionDate = sectionDateHint(section);
    for (const it of collectSectionItemsIn(section)) {
      if (seen.has(it.videoId)) continue;
      if (mode === 'shorts' && !it.short) continue;
      if (mode === 'videos' && it.short) continue;
      seen.add(it.videoId);

      const cardText = (it.card.textContent || '').replace(/\s+/g, ' ').trim();
      const cardDate = parseRelativeTime(cardText);
      const watchedAt = cardDate || sectionDate;

      let range: 'in' | 'out' | 'unknown' = 'unknown';
      if (watchedAt) {
        range = watchedAt >= r.start && watchedAt <= r.end ? 'in' : 'out';
      }

      if (range === 'in') {
        inRange.push({
          videoId: it.videoId,
          title: it.link.getAttribute('title') || it.link.textContent?.trim() || cardText.slice(0, 80) || (it.short ? 'Short' : 'Video'),
          thumbnail: getThumbnail(it.card),
          watchedAt,
          range,
          isShort: it.short,
          href: it.href,
          el: it.card as HTMLElement
        });
      } else if (range === 'unknown') {
        skipped++;
        if (samples.length < 5 && !watchedAt) {
          samples.push(cardText.slice(0, 300));
        }
      }
    }
  }

  return { inRange, skipped, samples };
}

async function autoScrollShelves(onProgress: (found: number) => void, mode: Mode, r: DateRange): Promise<void> {
  const shelves = $$('yt-horizontal-list-renderer');
  for (const shelf of shelves) {
    const anchor = shelf.querySelector('a[href*="/shorts/"]') || shelf;
    const d = sectionDateHint(anchor);
    if (d && d.getTime() < r.start.getTime()) continue;
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
      await wait(700);
      const after = shelf.querySelectorAll('a[href*="/shorts/"]').length;
      onProgress(countMatches(mode));
      if (after === before) { stall++; if (stall >= 3) break; } else stall = 0;
    }
  }
}

function sectionDates(): Date[] {
  return $$('#contents ytd-item-section-renderer, #contents ytm-item-section-renderer')
    .map(s => sectionDateHint(s))
    .filter((d): d is Date => !!d);
}

function enoughLoaded(r: DateRange): boolean {
  const ds = sectionDates();
  if (!ds.length) return false;
  let min = Infinity;
  for (const d of ds) if (d.getTime() < min) min = d.getTime();
  return min <= r.start.getTime();
}

async function autoScroll(onProgress: (found: number) => void, mode: Mode, r: DateRange): Promise<number> {
  let lastCount = -1;
  let stallCount = 0;
  let found = 0;

  // Phase 1: vertical scroll to load day sections — but only as far as the range needs
  for (let i = 0; i < 35; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await wait(1200);

    found = countMatches(mode);
    onProgress(found);
    if (enoughLoaded(r)) break;
    if (found === lastCount) { stallCount++; if (stallCount >= 3) break; } else stallCount = 0;
    lastCount = found;
  }

  // Phase 2: horizontal scroll on each in-range reel shelf to load all shorts
  if (mode !== 'videos') await autoScrollShelves(onProgress, mode, r);

  found = countMatches(mode);
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
    'button[aria-label*="More actions"], [aria-label="More actions" i], ytd-menu-renderer button, ytd-menu-renderer #top-level-button, [aria-label*="Action menu" i], button[aria-label*="Action menu"]'
  );
}

function menuButtonShadow(root: Element): HTMLElement | null {
  const mr = deepCollect(root, 'ytd-menu-renderer, ytm-menu-popup-renderer')[0];
  if (!mr) return null;
  const sr = (mr as Element & { shadowRoot?: ShadowRoot | null }).shadowRoot;
  if (!sr) return null;
  return deepFind(sr, 'button, [role="button"], tp-yt-paper-icon-button, yt-icon-button, [class*="button"]') as HTMLElement | null;
}

function locateCardForMenu(videoId: string): { card: Element | null; btn: HTMLElement | null } {
  const link = document.querySelector(`#contents a[href*="/shorts/${videoId}"], #contents a[href*="v=${videoId}"]`);
  if (!link) return { card: null, btn: null };

  let n: Element | null = link as Element;
  while (n && n !== document.body) {
    const links = n.querySelectorAll('a[href*="/watch?v="], a[href*="/shorts/"]');
    if (links.length >= 1 && links.length <= 4) {
      const root = findEntryRoot(n) || n;
      const btn = findMenuButton(root) || menuButtonShadow(root);
      if (btn) return { card: root, btn };
    }
    n = n.parentElement;
  }
  return { card: null, btn: null };
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

async function removeWatchHistoryItem(videoId: string, cardEl: HTMLElement | null): Promise<boolean> {
  let root = cardEl && cardEl.isConnected ? cardEl : null;
  let menuBtn = root ? findMenuButton(root) : null;

  if (!root || !menuBtn) {
    const located = locateCardForMenu(videoId);
    if (located.btn) {
      if (located.card) root = located.card as HTMLElement;
      menuBtn = located.btn;
    }
  }

  if (!root) {
    logDelete(`[${videoId}] card not found`);
    return false;
  }
  if (!menuBtn) {
    const menus = Array.from(root.querySelectorAll('ytd-menu-renderer, ytm-menu-popup-renderer, [class*="menu"]'))
      .map(e => (e.getAttribute('aria-label') || (e.textContent || '').trim().slice(0, 20)))
      .filter(Boolean)
      .slice(0, 4);
    logDelete(`[${videoId}] no "More actions" button found. card=${root.tagName} menus=${JSON.stringify(menus)}`);
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
  el('ytsc-delete-label').textContent = 'Delete ' + modeNoun();
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
      <div class="ytsc-label" id="ytsc-mode-label">Delete items watched…</div>
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

  overlay.querySelectorAll('.ytsc-mode .ytsc-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMode = (btn as HTMLElement).dataset.mode as Mode;
      overlay!.querySelectorAll('.ytsc-mode .ytsc-mode-btn').forEach(b =>
        b.classList.toggle('active', b === btn)
      );
      el('ytsc-mode-label').textContent = 'Delete items watched…';
      on('Pick a date range');
    });
  });

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

let pendingTargets: ScannedItem[] = [];

function buildDebugDump(samples: string[], inRange?: ScannedItem[]): string {
  const lines: string[] = [];
  lines.push('URL: ' + window.location.href);
  lines.push('mode: ' + currentMode);
  const vrs = document.querySelectorAll('#contents ytd-video-renderer');
  lines.push('ytd-video-renderer count: ' + vrs.length);
  if (vrs.length) {
    const vr = vrs[0];
    const links = Array.from(vr.querySelectorAll('a'))
      .slice(0, 5)
      .map(a => (a.getAttribute('href') || '').slice(0, 60))
      .filter(Boolean);
    lines.push('vr#1 connected: ' + vr.isConnected);
    lines.push('vr#1 in template: ' + !!vr.closest('template'));
    lines.push('vr#1 links: ' + JSON.stringify(links));
    lines.push('vr#1 html head: ' + vr.outerHTML.replace(/\s+/g, ' ').slice(0, 250));
  } else {
    lines.push('ytd-video-renderer (anywhere): ' + document.querySelectorAll('ytd-video-renderer').length);
  }

  const allLinks = findTitleLinks();
  lines.push('total title links: ' + allLinks.length);
  lines.push('short links: ' + allLinks.filter(l => (l.getAttribute('href') || '').includes('/shorts/')).length);
  lines.push('video links: ' + allLinks.filter(l => !!l.getAttribute('href') && /[?&]v=/.test(l.getAttribute('href') || '') && !(l.getAttribute('href') || '').includes('/shorts/')).length);

  lines.push('--- per-section counts ---');
  $$('#contents ytd-item-section-renderer, #contents ytm-item-section-renderer').forEach((s, i) => {
    if (i >= 18) return;
    const head = ((s as HTMLElement).innerText || '').split('\n').map(x => x.trim()).filter(Boolean)[0] || '?';
    const d = sectionDateHint(s);
    lines.push(
      `  ${i + 1}. header="${head.slice(0, 30)}" date=${d ? d.toISOString().slice(0, 10) : '?'} shorts=${s.querySelectorAll('a[href*="/shorts/"]').length} videos=${s.querySelectorAll('a[href*="/watch?v="]').length}`
    );
  });

  const firstWatch = document.querySelector('#contents a[href*="/watch?v="]');
  if (firstWatch) {
    const card = findEntryRoot(firstWatch);
    const sec = card ? findSection(card) : null;
    lines.push('first watch?v card: ' + (card ? card.tagName : 'null'));
    lines.push('first watch?v section: ' + (sec ? sec.tagName : 'null'));
    lines.push('first watch?v sectionDateHint: ' + (sec ? (sectionDateHint(sec) ? sectionDateHint(sec)!.toISOString().slice(0, 10) : '?') : '?'));
    lines.push('first watch?v html head: ' + (card ? card.outerHTML.replace(/\s+/g, ' ').slice(0, 250) : 'none'));
  } else {
    lines.push('--- watch?v card details (section-scoped) ---');
    let printed = 0;
    $$('#contents ytd-item-section-renderer, #contents ytm-item-section-renderer').forEach(s => {
      if (printed >= 2) return;
      const v = s.querySelector('a[href*="/watch?v="]');
      if (!v) return;
      const card = findEntryRoot(v) || v;
      printed++;
      const head = ((s as HTMLElement).innerText || '').split('\n').map(x => x.trim()).filter(Boolean)[0] || '?';
      lines.push(`sec="${head.slice(0, 25)}" card=${card.tagName} dur=${cardDurationSeconds(card)} href=${(v.getAttribute('href') || '').slice(0, 30)}`);
      lines.push(`  title=${(card.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120)}`);
      lines.push(`  html=${card.outerHTML.replace(/\s+/g, ' ').slice(0, 400)}`);
    });
  }

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

  if (inRange && inRange.length) {
    lines.push(`--- in-range (${inRange.length}) ---`);
    inRange.slice(0, 30).forEach((it, i) => {
      const d = it.watchedAt ? it.watchedAt.toISOString().slice(0, 10) : '?';
      const dur = it.el ? cardDurationSeconds(it.el) : null;
      lines.push(`  ${i + 1}. [${it.isShort ? 'S' : 'V'}] ${d} ${dur !== null ? dur + 's' : '?'} ${(it.href || '').slice(0, 35)} ${it.title.slice(0, 40)}`);
    });
  }

  return lines.join('\n');
}

async function runScan(days: number) {
  showCard('ready');
  showProgress(true, `Loading your history… (detected so far: 0)`);
  const r = getRange(days);

  const found = await autoScroll(n => {
    el('ytsc-progress-text').textContent = `Loading your history… (detected so far: ${n})`;
  }, currentMode, r);

  showProgress(true, 'Analyzing watched dates…');
  const { inRange, skipped, samples } = scanItems(r, currentMode);

  pendingTargets = inRange;

  const noun = modeNoun();
  const cap = noun.charAt(0).toUpperCase() + noun.slice(1);
  const warnBase = `${skipped} ${noun} found but their watch date couldn't be read — skipped to avoid deleting outside your range.`;
  const debugText = buildDebugDump(samples, inRange);

  if (inRange.length === 0) {
    showCard('results');
    el('ytsc-count-big').textContent = '0';
    el('ytsc-range-label').textContent = `No ${noun} found in ${rangeLabel(days)}`;
    el('ytsc-list').innerHTML = '';
    el('ytsc-warn').textContent = skipped > 0 ? warnBase : '';
    el('ytsc-delete-btn').style.display = 'none';
    el('ytsc-debug').classList.toggle('show', true);
    el('ytsc-debug-text').textContent = debugText;
    console.log('[YTS-Cleaner] DEBUG DUMPS:\n' + debugText);
    return;
  }

  showCard('results');
  el('ytsc-count-big').textContent = inRange.length.toString();
  let label = `${cap} watched ${rangeLabel(days)} (found ${found} total in loaded history)`;
  if (currentMode === 'all') {
    const s = inRange.filter(x => x.isShort).length;
    const v = inRange.length - s;
    label += `<span style="display:block;margin-top:4px;color:#ff4757">${s} Shorts · ${v} Videos</span>`;
  }
  el('ytsc-range-label').innerHTML = label;
  el('ytsc-delete-btn').style.display = 'block';
  el('ytsc-delete-label');

  el('ytsc-list').innerHTML = inRange.slice(0, 20).map(s => `
    <div class="ytsc-item">
      <img src="${s.thumbnail}" alt="">
      <div class="ytsc-t">${s.title.replace(/</g, '&lt;')}</div>
    </div>
  `).join('');

  el('ytsc-warn').textContent = skipped > 0 ? warnBase : '';
  el('ytsc-debug').classList.toggle('show', true);
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
    const ok = await removeWatchHistoryItem(t.videoId, t.el);
    if (ok) success++;
    else failed++;
    el('ytsc-deleting-text').textContent = `Deleting… ${attempted} / ${pendingTargets.length}`;
    await wait(500);
  }

  showCard('done');
  el('ytsc-done-count').textContent = success.toString();
  el('ytsc-done-label').textContent = failed > 0
    ? `Deleted ${success} ${modeNoun()} · ${failed} could not be removed`
    : `Deleted ${success} ${modeNoun()} from your history!`;
  el('ytsc-done-warn').textContent = failed > 0
    ? 'Debug: ' + deleteLog.slice(0, 5).join(' | ')
    : '';
  console.log('[YTS-Cleaner] delete log:', JSON.stringify(deleteLog, null, 2));

  el('ytsc-done-label').textContent += ' Refreshing page…';
  await wait(2000);
  window.location.reload();
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