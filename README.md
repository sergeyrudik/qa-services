# QA services — Sergei Rudik

Static services landing page for https://qa.rudik.dev.

- Russian: `/`
- English: `/en/`

Plain HTML, CSS and a small JavaScript email-brief helper. No dependencies or build step. The form opens a draft in the visitor's email client; it does not submit or store data on a server. Direct email and LinkedIn links work without JavaScript.

Language: the switch in the header saves `localStorage.lang` and a `lang` cookie on `.rudik.dev`, so the choice carries over to https://mentor.rudik.dev. The inline script in `<head>` redirects to `/en/` when the saved language is English or the browser language is English and no choice was made yet.

Preview: `python3 -m http.server 4174`

GitHub Pages: deploy from `main`, root directory. DNS: CNAME `qa` → `sergeyrudik.github.io`.
