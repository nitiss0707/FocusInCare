# Focus In Care — Website

Static bilingual site (English + Spanish) for Focus In Care Training & Consulting Inc.
Plain HTML/CSS/JS, no build step. Open `index.html` in a browser to preview; upload the whole
folder to any web host to publish.

## Structure

| English (root)        | Spanish (`/es`)             | Purpose                                   |
|-----------------------|-----------------------------|-------------------------------------------|
| `index.html`          | `es/index.html`             | Home                                      |
| `services.html`       | `es/servicios.html`         | Consulting services (all 11 old pages merged) |
| `training.html`       | `es/capacitacion.html`      | CPR / First Aid / OSHA training           |
| `fingerprinting.html` | `es/huellas-digitales.html` | AHCA Level 2 fingerprinting               |
| `about.html`          | `es/nosotros.html`          | About / founder                           |
| `contact.html`        | `es/contacto.html`          | Contact form + details                    |
| `privacy.html`        | `es/privacidad.html`        | Privacy policy                            |

- `assets/css/styles.css` — all styles (brand colors are CSS variables at the top)
- `assets/js/main.js` — mobile menu + contact form
- `assets/img/logo.svg` — logo from the old site; `favicon.svg` is a placeholder "F" mark
- `sitemap.xml`, `robots.txt` — for Google

The header and footer are repeated in every page. If you change a nav link, phone number,
etc., update all 14 HTML files (a find-and-replace across the folder works well).

Every page has a unique title, meta description, one H1, Open Graph tags, and English/Spanish
`hreflang` links. The home pages include LocalBusiness structured data (schema.org).

## Before launch — to do

**Contact form.** The form currently opens the visitor's email app (mailto fallback). To receive
submissions directly, create a free endpoint (Formspree, Basin, Netlify Forms…) and paste its URL
into `data-endpoint=""` on the `<form>` in `contact.html` and `es/contacto.html`.

**Images.** All photos are dashed placeholders (`<div class="ph">`) labeled with the suggested
shot. Replace each with `<img src="assets/img/…" alt="…">`. Also add:
- `assets/img/og-image.png` (1200×630) — image shown when the site is shared on social/WhatsApp
- Map embed on the contact page (Google Maps "Embed a map" iframe)

**Content to confirm with the client** (carried over or inferred from the old site):
- [ ] Years of experience — old site said both "20+" and "25+"; new site uses "20+"
- [ ] "Free consultation" — is the first consultation actually free?
- [ ] Spanish-language service — confirm all services are offered in Spanish
- [ ] Office hours — currently "By appointment — please call ahead"
- [ ] Fingerprinting: Live Scan, ink cards, and on-site group service — confirm all three are offered
- [ ] CPR certification body (old site had an American Safety & Health Institute logo) — add to About › Credentials
- [ ] Wanda's credentials/titles for the About page
- [ ] "We'll respond within one business day" on the contact page
- [ ] Real client testimonials (3 placeholders on the home page)
- [ ] Upcoming class schedule for the Training page
- [ ] Social media links (none included — old ones pointed nowhere)
- [ ] Privacy policy — a plain-language draft; have it reviewed before launch
- [ ] Have a native Spanish speaker proofread the `/es` pages

**Intentionally not carried over from the old site:** the template testimonials (e.g., "Emily
Thompson, CEO"), the "97% happy patients / 3.6K+ home care / 85+ nurses" stats, the "Meet Our
Nurses" lorem-ipsum section, and the "home care process" steps (written for a home care agency,
not a consultancy). These looked like theme-demo content; add them back only if they're accurate.
