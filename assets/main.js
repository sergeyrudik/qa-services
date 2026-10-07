// Every language URL stays crawlable; saved preferences suggest a language without redirecting.
const validLanguage = value => value === 'ru' || value === 'en';
function rememberLanguage(language) {
  try { localStorage.setItem('lang', language); } catch (_) {}
  try { document.cookie = 'lang=' + language + ';path=/;max-age=31536000;SameSite=Lax' + (location.protocol === 'https:' ? ';Secure' : '') + (/(^|\.)rudik\.dev$/.test(location.hostname) ? ';domain=rudik.dev' : ''); } catch (_) {}
}
function prepareLanguageLink(link) {
  link.addEventListener('click', () => {
    rememberLanguage(link.hreflang);
    const url = new URL(link.href);
    url.hash = location.hash;
    link.href = url.href;
  });
}
document.querySelectorAll('.lang a').forEach(prepareLanguageLink);
let preferred = null;
try { const cookie = /(?:^|;\s*)lang=([^;]+)/.exec(document.cookie); if (cookie && validLanguage(cookie[1])) preferred = cookie[1]; } catch (_) {}
if (!preferred) { try { const saved = localStorage.getItem('lang'); if (validLanguage(saved)) preferred = saved; } catch (_) {} }
if (!preferred) preferred = /^en(?:-|_|$)/i.test(navigator.languages?.[0] || navigator.language || '') ? 'en' : 'ru';
if (preferred !== document.documentElement.lang) {
  const suggestion = document.querySelector('.language-suggestion');
  const link = document.createElement('a');
  link.href = preferred === 'en' ? '/en/' : '/';
  link.hreflang = preferred;
  link.lang = preferred;
  link.textContent = preferred === 'en' ? 'Prefer English? Read this page in English.' : 'Читать эту страницу на русском';
  prepareLanguageLink(link);
  suggestion.append(link);
  suggestion.hidden = false;
}
const selection = document.querySelector('#service');
const form = document.querySelector('#brief');
const task = document.querySelector('#task');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { selection.value = link.dataset.service; });
});
task.addEventListener('input', () => { task.setCustomValidity(''); });
form.addEventListener('submit', event => {
  if (!task.value.trim()) {
    event.preventDefault();
    task.setCustomValidity(isEn ? 'Please describe your goal or task.' : 'Пожалуйста, опишите цель или задачу.');
    task.reportValidity();
    task.focus();
  } else {
    try { localStorage.setItem('pending-lead-' + (isEn ? 'en' : 'ru'), String(Date.now())); } catch (_) {}
  }
});
