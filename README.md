# Paradise Golf – Interactive Membership Page

## What I built

A single-page membership explorer using plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step — open `index.html` in any browser and it works.

## Approach

Rather than recreating the flyer as a static table, I focused on making the information useful for a real person making a decision. The page is structured in three layers:

1. **Why join** — a brief benefits section that builds value before showing any prices
2. **Plan cards** — seasonal pricing toggle (Year-Round / Summer / Winter) that updates all four cards at once, with expandable benefit details per plan
3. **Comparison table** — lets the user pick which plans to compare side by side, with checkmarks and notes instead of walls of text

I also added a short **"Help me choose" quiz** that asks three questions about frequency, season preference, and priorities, then recommends the most fitting plan and scrolls to it.

## File structure

```
index.html   — layout
data.js      — all membership data and quiz questions hardcoded
style.css    — design and brand colors
app.js       — all interactivity
README.md    — this file
```

## With more time

I would invest in UX/UI improvements: smoother transitions when prices update between seasons, a more polished mobile experience, better visual hierarchy on the comparison table for quick scanning, and a "Select this plan" call-to-action flow on each card. The quiz result screen could also feel more celebratory and less utilitarian.
