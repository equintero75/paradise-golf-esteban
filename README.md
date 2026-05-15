# Paradise Golf – Interactive Membership Page

## What I built

A single-page membership explorer using plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step. Open `index.html` in any browser and it works immediately.

## Why this approach

The brief said to avoid recreating the flyer as a table and to think about making the information useful for a real person. The core friction a prospective member faces is: *"I don't know when I'd start, so which season price applies to me?"* I made that the central interaction — a season toggle at the top that immediately updates pricing across all four cards.

The card layout lets users scan the plans side by side without scrolling through a dense table. Key differentiators surface at a glance (complimentary rounds, coupon counts, Play Day savings), and the full benefit detail is available on demand behind an expand button — it's there when you want it, out of the way when you don't.

## File structure

```
index.html   — layout skeleton, no logic
data.js      — all membership data hardcoded as JS constants
style.css    — visual design, brand colors, responsive grid
app.js       — builds cards from data, handles season toggle and expand/collapse
README.md    — this file
```

## How to customize

- **Change prices or benefits** — edit `data.js`. Each plan has a `pricing` object with `yearRound`, `summer`, and `winter` keys, and a `benefits` object with `cardholder` and `additional` arrays.
- **Change card highlight color** — each plan in `data.js` has an `accentColor` field for the top bar.
- **Add/remove a plan** — add or remove an object from the `PLANS` array in `data.js`. No other file needs to change.
- **Change the tagline under a plan name** — edit the `tagline` field in `data.js`.
- **Add a badge** (like "Most Popular") — add a `badge` field to any plan object in `data.js`.
- **Brand color** — defined as `--green: #004D00` at the top of `style.css` and used throughout.

## What I would improve with more time

- A short "Help me choose" quiz that asks 2–3 questions (how often do you play? do you want year-round or seasonal?) and scrolls to or highlights the recommended plan.
- Smooth CSS transitions when prices update between seasons instead of a hard re-render.
- A sticky summary bar when a user clicks "Select" on a plan, so they can continue reading while seeing their chosen plan.
- Accessible focus management when panels expand/collapse.
- Print stylesheet so the full comparison can be saved as a PDF.
