# SplitTab — Beautiful Bill Splitting

 SplitTab (a.k.a. Trip Splitter) — a lightweight, delightful web app for tracking shared expenses on trips and events.

SplitTab makes logging payments, splitting them among any subset of participants, and calculating minimal settlement transfers simple and friendly. It ships as a client-side React app (Vite) so you can run locally or deploy a static bundle.

---

## Why SplitTab

- Fast, focused UI for real-time bill splitting and balances
- Split on a per-payment basis (choose who shares each expense)
- Computes minimal set of transfers to settle debts
- Lightweight: Vite + React, no backend required for the core experience
- Easy to customize — replace `src/assets/bg.png` to change the app backdrop

---

## Features

- Add participants and log payments with descriptions
- Select any subset of trip members to split a payment with
- Live balances panel with avatar colors
- Reverse chronological payment feed (each payment is shown as a tidy white card)
- Settlement screen computes who pays whom with minimal transfers

---

## Tech stack

- React 19
- Vite for dev + bundling
- Plain CSS (single `src/App.css`) and componentized UI in `src/components`

---

## Quick start

Prerequisites: Node.js 18+ and npm

Install and run locally:

```bash
cd trip-splitter
npm install
npm run dev
```

Open the dev server at the URL Vite prints (commonly `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

---

## Project layout

- `index.html` — app entry
- `src/main.jsx` — app bootstrap (renders `<App />`)
- `src/App.jsx` — top-level routing between setup / trip / settlement phases
- `src/App.css` — global styles, design tokens and translucency variable `--panel-bg`
- `src/components/SetUp.jsx` — participant entry UI
- `src/components/Trip.jsx` — payments, balances and logging UI
- `src/components/Settlement.jsx` — final settlement instructions and transfers
- `src/utils/splitLogic.js` — balance computation and settlement algorithm
- `src/assets/bg.png` — main background image (replaceable)

---

## Background & appearance

- Replace `src/assets/bg.png` with your artwork to change the app background.
- Panel translucency is controlled by `--panel-bg` in `src/App.css`. Increase alpha for more opaque cards or lower it to reveal the backdrop.
- The right-side form column intentionally stays white to preserve input contrast while other panels remain translucent.

---

## How settlement works (brief)

Each payment records a `payer`, an `amount`, and a `splitWith` list. Balances are computed by assigning equal shares to all participants of that payment. The settlement step runs a simple greedy matching algorithm to pair debtors and creditors into transfers that clear balances with minimal transactions.

See `src/utils/splitLogic.js` for the implementation.

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo and create a branch for your feature/fix
2. Make your changes and add concise commit messages
3. Open a pull request with screenshots and a short description

---

## Deployment suggestions

- The project produces a static bundle via `npm run build` — host on Netlify, Vercel, GitHub Pages, or any static host.
- For public deployments, remove any development-only debug code and ensure `bg.png` is optimized for web.

---

## License

MIT. Use and adapt freely.

---

Enjoy splitting!
