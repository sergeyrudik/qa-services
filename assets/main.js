const service = document.querySelector('#service');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { service.value = link.dataset.service; });
});
document.querySelector('#brief').addEventListener('submit', event => {
  event.preventDefault();
  const task = document.querySelector('#task').value.trim();
  if (!task) { document.querySelector('#task').focus(); return; }
  const subject = `QA: ${service.value}`;
  const body = `Здравствуйте, Сергей!\n\nИнтересует: ${service.value}\n\n${task}`;
  window.location.href = `mailto:rudikqa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Письмо подготовлено. Если почта не открылась, напишите на rudikqa@gmail.com — текст задачи остаётся в форме.';
});
