const isEn = document.documentElement.lang === 'en';
const mail = isEn ? {
  greeting: 'Hello Sergei,', interested: 'I am interested in:',
  subject: 'QA services: ',
  empty: 'Please briefly describe your goal or task.',
  status: 'A draft email is ready. If your email app does not open, write to rudikqa@gmail.com. Your text is still in the form.'
} : {
  greeting: 'Здравствуйте, Сергей!', interested: 'Интересует:',
  subject: 'QA: ',
  empty: 'Пожалуйста, кратко опишите цель или задачу.',
  status: 'Письмо подготовлено. Если почта не открылась, напишите на rudikqa@gmail.com. Ваш текст остался в форме.'
};
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
  event.preventDefault();
  const message = task.value.trim();
  if (!message) {
    task.setCustomValidity(mail.empty);
    task.reportValidity();
    task.focus();
    return;
  }
  const body = `${mail.greeting}\n\n${mail.interested} ${selection.value}\n\n${message}`;
  window.location.href = `mailto:rudikqa@gmail.com?subject=${encodeURIComponent(mail.subject + selection.value)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = mail.status;
});
// Keep the submit action disabled when JavaScript is unavailable; direct contact links still work.
form.querySelector('button[type="submit"]').disabled = false;
