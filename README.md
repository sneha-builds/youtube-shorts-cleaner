# YouTube Shorts Cleaner

A Chrome extension (Manifest V3) that deletes watched **YouTube Shorts** from your watch history by date range — automatically, in bulk.

## What it does

- Lets you pick **Today · Yesterday · Last 3 / 7 / 30 Days**
- Auto-scrolls your history page (vertically + horizontally) to load every Short   
- Reads the watch date of each Short from its section header ("Today", "Saturday", "7 Sept", …)
- Shows a count with titles **before** anything is deleted
- On confirm, clicks "Remove from watch history" on each matching Short, one by one, with a live progress counter

**No Google Cloud setup, no API keys, no OAuth, no background worker.** Everything runs locally in your browser.

## How it works

The UI lives **on the YouTube history page**. When you open `youtube.com/feed/history`, the content script injects a floating panel in the top-right corner. There is no backend and nothing is sent anywhere — all detection and deletion happens through the page's own UI.

### Deletion engine (robust vs. YouTube's dynamic DOM)

- **Shadow-DOM aware** — searches inside shadow roots, which YouTube uses on Shorts cards
- **Hover reveal sequence** — sends pointerenter/pointerover/mousemove before clicking, because YouTube only shows the "More actions" menu on real hover
- **Generic menu matching** — after opening the menu, finds the option by its text ("remove from watch history") *anywhere* on the page, so it keeps working even when YouTube swaps menu element types
- **Range-safe** — Shorts whose watch date can't be determined are **skipped**, never deleted outside your chosen range by accident

## Usage

1. Click the extension icon → click **Open YouTube History**
2. A panel appears: `[Today | Yesterday | Last 3 Days | Last 7 Days | Last 30 Days]`
3. Pick a range → it scans and shows the count (with watch-date breakdown)
4. Confirm → it deletes each matching Short, showing progress
5. Done — summary shown on the panel

## Install

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `youtube-shorts-cleaner` folder
4. Make sure you're **signed into YouTube**

## Rebuild after edits

```bash
cd ~/Desktop/youtube-shorts-cleaner
npm install
npm run build
```

Then reload the extension at `chrome://extensions/` (↻ icon). If you changed the content script, also **close and reopen the YouTube history tab** — YouTube caches the old script.

## Project structure

```
youtube-shorts-cleaner/
├── manifest.json                  # MV3; content script auto-injects on /feed/history
├── package.json                   # esbuild + typescript (dev deps only)
├── tsconfig.json                  # strict TS
├── esbuild.config.js              # bundles historyScraper + popup → src/*.js
├── .gitignore
├── icons/                         # extension icons (16/48/128)
└── src/
    ├── historyScraper.ts          # ALL logic: overlay UI + scroll + scan + delete
    ├── historyScraper.js          # compiled (kept in repo for clone-&-load)
    ├── popup.html                 # mini popup: just opens the history page
    ├── popup.ts / popup.js
    └── popup.css
```

## Notes & expectations

- Designed around the current YouTube history page layout (`ytd-reel-shelf-renderer` + `yt-horizontal-list-renderer` shelves, day-based section headers).
- **Last 30 Days** takes a while (lots of scrolling) — watch the live counter.
- YouTube changes its DOM over time; if count or deletion ever stops working, the selectors in `src/historyScraper.ts` need a tune-up (a `Debug:` line on the done-card prints the relevant DOM state).
