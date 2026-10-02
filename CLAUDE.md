# Focus In Care — Website

Static bilingual (English + Spanish) site for Focus In Care Training & Consulting Inc., a Miami
healthcare consulting, fingerprinting, and CPR/First Aid training business owned by Wanda Nitiss.
Plain HTML/CSS/JS with no build step. Hosted on Cloudflare Pages, deployed from GitHub.
See [README.md](README.md) for the page map and the launch to-do list.

## Who you're working with

The person giving instructions is usually the business owner, not a developer. Assume she does
not know Git, HTML, or CSS.

- Talk in plain language. Don't use jargon like "commit", "branch", "diff", or "CSS" unless you
  explain it in the same sentence.
- Do the work instead of asking her to do technical steps.
- If a request is ambiguous (which photo, which page, what wording), ask one short question
  before changing anything.
- After each change, say in one or two sentences what changed and which pages it affects.
- If a request would be risky or can't be done safely, say so plainly and suggest an alternative.

## Safe workflow — always follow this

1. **Never commit or push directly to `main`.** `main` is the live website.
2. Make every change on a new branch with a short descriptive name (e.g. `update-training-hours`).
3. Open a pull request for the branch. Cloudflare Pages builds a preview link for it; share that
   link so she can review the change before it goes live.
4. Do not merge the pull request unless she explicitly says to publish it.
5. Make one logical change per branch/pull request so it's easy to review or undo.

## Keep both languages in sync

Every English page has a Spanish twin under `/es` (pairs are listed in the README).

- When changing content on one page, make the matching change on its twin.
- Spanish text must be natural Spanish, not a literal word-for-word translation. If you're
  unsure of a phrase, flag it for a native speaker to check instead of guessing silently.
- Spanish pages reference assets with `../assets/...`; English pages use `assets/...`.

## Repeated content — update every page

The header, footer, nav, phone number, address, and email address are repeated in all 14 HTML
files. If any of these change, find-and-replace across every page (root and `/es`) and confirm
nothing was missed with a search afterwards.

## Do not change unless explicitly asked

- The Formspree URL in `data-endpoint` on the contact forms (`contact.html`, `es/contacto.html`)
  and the form handling in `assets/js/main.js`.
- `sitemap.xml`, `robots.txt`, canonical URLs, `hreflang` links, and the schema.org structured
  data. These affect Google search. If a page is added, renamed, or removed, update the sitemap
  and the hreflang links on both language versions together.
- The domain `focusincaretc.com` used in meta tags and links.
- Business facts (hours, prices, certifications, years of experience, claims such as "free
  consultation"). Don't invent or "improve" these. The README lists items still awaiting
  confirmation; don't fill those in on your own.

## Photos

- Save images in `assets/img/` with lowercase, hyphenated names (e.g. `wanda-nitiss.jpg`).
- Resize before adding: keep web images small (roughly 800–1600 px wide and under ~250 KB),
  and crop to the shape of the spot they go in. Portraits use 4:5 at about 800×1000.
- Always include meaningful `alt` text that describes the photo, in the page's language, and
  `width`/`height` attributes. Use `loading="lazy"` for images below the first screen.
- Placeholders are `<div class="ph">` blocks. Replace the whole block with an `<img>`.
- `assets/img/wanda-nitiss.jpg` is a temporary photo; it will be replaced with a business photo.
- Don't use photos of identifiable people other than the business owner's own staff and
  clients who have approved, and never use stock or internet photos without permission.

## Code conventions

- Match the existing style of the surrounding HTML and CSS. Brand colors and spacing are CSS
  variables at the top of `assets/css/styles.css`; use them instead of hard-coded values.
- All styles live in `assets/css/styles.css`. Don't add inline styles or new frameworks, and
  don't introduce a build step or external dependencies.
- Keep one `<h1>` per page, and keep each page's unique `<title>` and meta description accurate
  if its content changes.
- Keep pages accessible: alt text on images, labels on form fields, sufficient color contrast.
- Before finishing, check that every new link and image path actually exists, and that the
  page still looks right at phone width as well as on a desktop.
