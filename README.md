# British Airways Home Screen Rebuild

A self-contained, frontend-only rebuild of the British Airways homepage/booking screen, built with React (Vite) and Tailwind CSS. No backend, auth, or real booking logic — all data is local mock JSON.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
  components/
    Header.jsx           # Nav bar, logo, login link, mobile hamburger menu
    Hero.jsx              # Full-width auto-rotating banner/carousel
    FlightSearch.jsx      # Book flights / Manage booking / Check-in tabs
    DestinationCards.jsx  # Destination grid driven by destinations.json
    OffersSection.jsx     # Offers/Executive Club cards driven by offers.json
    Footer.jsx             # Link columns, social icons, legal text
  data/
    destinations.json     # Mock destination + pricing data for cards
    offers.json            # Mock offers/promo data
    airports.json           # Mock airport list for From/To dropdowns
  styles/
    index.css              # Tailwind entrypoint + shared component classes
  App.jsx
  main.jsx
```

## Notes on scope

- **Flight search widget** is fully interactive (controlled inputs) with tabs for Book flights, Manage booking, and Check-in. Submitting the "Book flights" form shows a demo confirmation summary in place of a real search — there is no backend.
- **Cards and dropdowns** are driven entirely by the JSON fixtures in `src/data/`; swapping in real API data later just means replacing the `import` with a fetch call.
- **Styling** uses Tailwind with a small custom palette (`ba-navy`, `ba-red`) defined in `tailwind.config.js` to evoke the BA brand, plus shared utility classes (`btn-primary`, `input-field`, etc.) in `src/styles/index.css`.
- Imagery is sourced from Unsplash placeholder URLs for now — swap `src/data/*.json` image fields for licensed assets before shipping.
