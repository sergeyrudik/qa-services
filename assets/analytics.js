// Use the portfolio's GA4 stream across all rudik.dev sites.
window.dataLayer = window.dataLayer || [];
window.gtag = function () { window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', 'G-B4XR81HWTY');
// Send only fixed labels, never form text or mailto query strings.
document.addEventListener('click', function (event) {
  const link = event.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href === '#contact') window.gtag('event', 'contact_cta_click');
  if (href.startsWith('mailto:')) window.gtag('event', 'contact_email_click');
  if (['linkedin.com', 'www.linkedin.com'].includes(link.hostname)) window.gtag('event', 'contact_linkedin_click');
});
