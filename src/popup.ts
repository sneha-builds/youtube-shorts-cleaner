document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('open-history')?.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://www.youtube.com/feed/history', active: true });
    window.close();
  });
});