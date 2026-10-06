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
// An explicit query parameter keeps the language switch working even when storage is blocked.
document.querySelectorAll('.lang a').forEach(link => {
  link.addEventListener('click', () => {
    const url = new URL(link.href);
    url.hash = location.hash;
    link.href = url.href;
  });
});
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
