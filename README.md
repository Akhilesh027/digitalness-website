# Digitalness Complete Updated React Website

This package contains the complete website code with the restored full-site styling and the updated rounded navbar. The active stylesheet is `src/styles/global.css`; there is no `index.css` or separate `navbar.css` requirement.

The navbar component is `src/components/Navbar.jsx`, and the logo is loaded from `public/digitalness-logo.png`.

---

# Digitalness React Rebuild

A modern React/Vite implementation based on the supplied Digitalness website rebuild specification.

## Included

- Responsive React/Vite front end
- Sticky navigation with service mega menus
- 40+ data-driven individual service routes
- Homepage with services, industries, process, portfolio, statistics, testimonials, insights and CTA
- About, Portfolio, Blog, Contact, Case Studies/Careers/FAQ/legal route scaffolds
- Motion/reveal transitions with Framer Motion
- Per-route SEO metadata with React Helmet Async
- Branding tools: logo concepts, color palettes, typography pairings, market research prompts, positioning and branding funnel
- SEO audit endpoint and UI
- Keyword ideation tool
- Marketing funnel/revenue calculator
- Document conversion UI + LibreOffice-backed Word/PDF endpoint
- Contact lead endpoint that stores submissions locally in `server/data/leads.json`
- Responsive 404 page

## Important brand asset step

The requirement says the existing Digitalness logo/colors/font style must be preserved, but the actual logo/font files were not included with this specification. The UI therefore uses an isolated brand fallback.

Place the approved original logo at:

`public/digitalness-logo.png`

Then update only the CSS custom properties at the top of `src/styles/global.css` if the exact approved brand HEX values differ from the fallback values. No page code needs to change.

Do not redraw the production logo from the fallback wordmark.

## Run

```bash
npm install
npm start
```

This starts:

- Vite front end: http://localhost:5173
- Express API: http://localhost:8787

Or run separately:

```bash
npm run dev
npm run server
```

## Production build

```bash
npm run build
```

The compiled front end is generated in `dist/`.

## Document conversion dependency

Word→PDF and PDF→Word conversion uses LibreOffice headless mode. Install LibreOffice on the machine running the API and ensure `soffice`/`libreoffice` is available on PATH.

PDF→Word quality depends on the structure of the source PDF and LibreOffice's import capabilities. For high-fidelity commercial conversion, replace this endpoint with a dedicated document-conversion provider while keeping the same UI/API contract.

## SEO audit scope

The included audit checks page title, meta description, heading counts, image alt coverage, internal/external links, canonical URL, viewport, HTML size and basic response time. It intentionally does not pretend to provide live keyword volumes, Google Search Console data, PageSpeed/Lighthouse field data or backlink metrics. Connect appropriate APIs for those metrics.

## Content architecture

Service pages are generated from `src/data/services.js`, but each service contains its own focus, audience, features, deliverables and service-specific copy. Add or edit services there without creating new page components.

## Before production launch

1. Add the approved original Digitalness logo and exact brand values.
2. Replace placeholder legal pages with reviewed Privacy Policy and Terms & Conditions.
3. Replace generic testimonial labels with approved client testimonials.
4. Add real portfolio screenshots/results and client permissions.
5. Add final social profile URLs.
6. Connect contact submissions to your CRM/email workflow.
7. Add production analytics/consent configuration.
8. Run accessibility, Lighthouse, route, form and device QA.

## Scroll-to-top behavior

The project now includes two scroll helpers:

- `src/components/ScrollToTop.jsx` resets the page to the top on every React Router route change.
- `src/components/BackToTop.jsx` adds a floating up-arrow button after the visitor scrolls down.

Both are mounted in `src/components/Layout.jsx`.
