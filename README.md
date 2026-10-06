# QA services — Sergei Rudik

Static services landing page for https://qa.rudik.dev.

- Russian: `/`
- English: `/en/`

Plain HTML, CSS and a small JavaScript email-brief helper. No dependencies or build step. The form opens a draft in the visitor's email client; it does not submit or store data on a server. Direct email and LinkedIn links work without JavaScript.

Language: the switch in the header saves `localStorage.lang` and a `lang` cookie on `.rudik.dev`, so the choice carries over to https://mentor.rudik.dev. The inline script in `<head>` redirects to `/en/` when the saved language is English or the browser language is English and no choice was made yet.

Preview: `python3 -m http.server 4174`

GitHub Pages: deploy from `main`, root directory. DNS: CNAME `qa` → `sergeyrudik.github.io`.

## Search and indexing

`robots.txt` allows crawling and advertises `sitemap.xml`. The sitemap lists both language URLs and their alternates. Keep the sitemap and reciprocal hreflang links in sync when adding pages. Every URL keeps its language, regardless of browser or saved preference; the shared language preference only controls a suggestion. Structured data describes the real person and services; no ratings or prices are invented.

Submit `https://qa.rudik.dev/sitemap.xml` through your verified Google Search Console and Yandex Webmaster properties. Verification and submission must be completed in those accounts. No tracking scripts are added by this SEO change.
