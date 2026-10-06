const isEn = document.documentElement.lang === 'en';
const mail = isEn ? {
  greeting: 'Hello Sergei,',
  interested: 'I am interested in:',
  subject: 'QA services: ',
  status: 'A draft email is ready. If your mail app does not open, write to rudikqa@gmail.com. Your text is still in the form.'
} : {
  greeting: 'Здравствуйте, Сергей!',
  interested: 'Интересует:',
  subject: 'QA: ',
  status: 'Письмо подготовлено. Если почта не открылась, напишите на rudikqa@gmail.com. Ваш текст остался в форме.'
};
document.querySelectorAll('.lang a').forEach(link => {
  link.addEventListener('click', () => {
    try { localStorage.setItem('lang', link.hreflang); } catch (e) {}
    try { document.cookie = 'lang=' + link.hreflang + ';path=/;max-age=31536000;domain=.rudik.dev'; } catch (e) {}
  });
});
try {
  const shared = /(?:^|;\s*)lang=([^;]+)/.exec(document.cookie);
  if (shared && shared[1]) localStorage.setItem('lang', shared[1]);
} catch (e) {}
const service = document.querySelector('#service');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { service.value = link.dataset.service; });
});
document.querySelector('#brief').addEventListener('submit', event => {
  event.preventDefault();
  const task = document.querySelector('#task').value.trim();
  if (!task) { document.querySelector('#task').focus(); return; }
  const subject = mail.subject + service.value;
  const body = `${mail.greeting}\n\n${mail.interested} ${service.value}\n\n${task}`;
  window.location.href = `mailto:rudikqa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = mail.status;
});
