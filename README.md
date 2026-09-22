# YouTube Shorts Cleaner

A Chrome extension that deletes watched YouTube Shorts from your watch history by date range.

## How it works

The UI lives **on the YouTube history page**. When you open `youtube.com/feed/history`, the extension's content script renders a floating panel in the top-right corner.

**No Google Cloud setup, no API keys, no OAuth.**

## Flow

1. Click the extension icon → click **Open YouTube History**
2. You land on your signed-in history page — a panel appears:
   `[Today | Yesterday | Last 3 Days | Last 7 Days | Last 30 Days]`
3. Pick a range → it auto-scrolls your history, reads watch dates, shows the count
4. Confirm → it clicks "Remove from watch history" on each matching Short
5. Done — summary shown on the panel

## Install

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `youtube-shorts-cleaner` folder
4. Make sure you're **signed into YouTube**

## Rebuild after edits

```bash
cd ~/Desktop/youtube-shorts-cleaner
npm run build
```

Then reload the extension at `chrome://extensions/` (↻ icon). If you change the content script, also refresh the YouTube history tab.

## Project structure

```
youtube-shorts-cleaner/
├── manifest.json                  # MV3 manifest; content script auto-injects on /feed/history
├── package.json
├── tsconfig.json
├── esbuild.config.js              # Builds historyScraper + popup bundles
├── icons/
└── src/
    ├── historyScraper.ts          # Overlay UI + auto-scroll + scan + delete (all self-contained)
    ├── popup.html                 # Mini popup: just opens the history page
    ├── popup.ts
    └── popup.css
```

## Notes & expectations

- No background service worker, no messaging — the content script is fully self-contained, so it can't fail on message passing.
- **Last 30 Days** can take a while (lots of scrolling). Watch the live counter on the panel.
- YouTube's DOM changes over time; if dates or the delete menu stop being detected, the selectors in `historyScraper.ts` need a tune-up.
- Shorts whose watch date can't be read are **skipped** (never deleted outside your chosen range by accident).