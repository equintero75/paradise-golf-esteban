# Paradise Golf – Interactive Membership Page

## What I built

A single-page membership explorer using plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step. Open `index.html` in any browser and it works immediately.

## Why this approach

The brief said to avoid recreating the flyer as a table and to think about making the information useful for a real person. The core friction a prospective member faces is: *"I don't know when I'd start, so which season price applies to me?"* I made that the central interaction — a season toggle at the top that immediately updates pricing across all four cards.

The card layout lets users scan the plans side by side without scrolling through a dense table. Key differentiators surface at a glance (complimentary rounds, coupon counts, Play Day savings), and the full benefit detail is available on demand behind an expand button — it's there when you want it, out of the way when you don't.

Below the cards, a full benefit comparison table gives users a second, more analytical view of the same information. Cards are great for first impressions and emotional buy-in, but when someone is close to a decision they want to compare directly — row by row — without having to mentally hold one plan while reading another. The table makes that effortless: a checkmark means the plan includes it, a red cross means it doesn't, and a short note under each checkmark explains the exact value (how many rounds, how much off, which kind of discount). This way a user can immediately see where the value gap is between, say, Silver and Gold, or why Platinum commands a higher price — without having to read paragraphs of fine print.

## What I would improve with more time

- A short "Help me choose" quiz that asks 2–3 questions (how often do you play? do you want year-round or seasonal?) and scrolls to or highlights the recommended plan.
- Smooth CSS transitions when prices update between seasons instead of a hard re-render.
- A sticky summary bar when a user clicks "Select" on a plan, so they can continue reading while seeing their chosen plan.
- Accessible focus management when panels expand/collapse.
- Print stylesheet so the full comparison can be saved as a PDF.
