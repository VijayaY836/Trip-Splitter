# SplitTab ✈️💸

### Beautiful Bill Splitting for Trips, Adventures, and the Occasional Financial Disaster

Ever returned from a trip with 47 screenshots of payments, three different UPI histories, and a group chat argument that started with:

> "Wait... who paid for dinner on Day 2?"

SplitTab exists to prevent that.

SplitTab (formerly *Trip Splitter*) is a lightweight, delightful web app that helps friends track shared expenses, split costs fairly, and settle up without requiring a degree in accounting—or diplomacy.

Built with React and Vite, it runs entirely in the browser and can be deployed anywhere static sites are supported.

---

## Why SplitTab?

Because friendships should survive vacations.

SplitTab lets you:

✅ Log expenses in seconds
✅ Split bills among any subset of participants
✅ See balances update instantly
✅ Generate the minimum number of settlement payments
✅ Stop arguing about who owes ₹347.83

No backend. No accounts. No spreadsheets. No suffering.

---

## Features

### 👥 Add Participants

Create your trip group in seconds.

### 💳 Log Payments

Record who paid, how much they paid, and what it was for.

### 🎯 Flexible Splitting

Not everyone joined every activity—and that's okay.

Split expenses among any subset of participants instead of forcing everyone into every bill.

### 📊 Live Balances

Watch balances update instantly as expenses are added.

Colorful avatars make it easy to see who's funding the adventure and who's quietly accumulating debt.

### 🧾 Payment Timeline

All expenses appear in a clean reverse-chronological feed so you can easily revisit what happened.

### 🤝 Smart Settlements

When the trip ends, SplitTab calculates the smallest set of transfers needed to settle everything.

Less math. Fewer transactions. More peace.

---

## Tech Stack

Built with:

* React 19
* Vite
* Plain CSS
* A healthy dislike of manual expense calculations

---

## Quick Start

### Prerequisites

* Node.js 18+
* npm

### Run Locally

```bash
cd trip-splitter
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```text
index.html
src/
├── main.jsx
├── App.jsx
├── App.css
├── assets/
│   └── bg.png
├── components/
│   ├── SetUp.jsx
│   ├── Trip.jsx
│   └── Settlement.jsx
└── utils/
    └── splitLogic.js
```

### Key Files

* `src/App.jsx` — controls the overall application flow
* `src/components/SetUp.jsx` — participant setup
* `src/components/Trip.jsx` — expense tracking and balances
* `src/components/Settlement.jsx` — final settlement calculations
* `src/utils/splitLogic.js` — the magical accounting brain
* `src/assets/bg.png` — replace this to give the app your own vibe

---

## Make It Yours

### 🎨 Background

Replace:

```text
src/assets/bg.png
```

with your own image.

Beach trip?
Mountain trek?
Corporate retreat?
Questionable bachelor party?

The choice is yours.

### ✨ Panel Transparency

The translucency of most panels is controlled by:

```css
--panel-bg
```

inside `src/App.css`.

Increase opacity for cleaner readability or lower it to let your background shine through.

---

## How Settlement Works

Every payment stores:

* who paid
* how much they paid
* who shared the expense

Each expense is divided equally among the selected participants.

Once all expenses are entered, SplitTab computes everyone's net balance and runs a greedy matching algorithm to determine the smallest practical set of transfers required to settle all debts.

In short:

> The app does the math so your group doesn't have to.

See:

```text
src/utils/splitLogic.js
```

for implementation details.

---

## Contributing

Found a bug?

Have an idea?

Want to improve the UI?

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request
5. Accept our eternal gratitude

Bonus points for screenshots.

---

## Deployment

SplitTab generates a static build and can be deployed almost anywhere:

* Netlify
* Vercel
* GitHub Pages
* Any static hosting provider

Before deploying publicly:

* Remove development-only code
* Optimize background assets
* Test on mobile devices

---

## License

MIT License.

Build on it.
Customize it.
Share it.

Just don't make your friends calculate settlements manually.

---

### One Trip. One Ledger. Zero Arguments.

Happy splitting. 🚀
