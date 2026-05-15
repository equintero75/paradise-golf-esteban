// ─── Benefit comparison matrix ────────────────────────────────────────────────
// Each row has a label, an optional note shown under the ✓, and a `plans`
// object keyed by plan id. Set to true for a checkmark, false for an X.
const COMPARISON = [
  {
    category: "Cardholder Benefits",
    rows: [
      {
        label: "Complimentary Rounds",
        plans: { silver: false, gold: true, platinum: true, monthly: false },
        notes: { gold: "2 rounds at Heritage Isles", platinum: "4 rounds across Heritage Isles & Citrus National" },
      },
      {
        label: "Double Eagle Coupons",
        plans: { silver: true, gold: true, platinum: true, monthly: true },
        notes: { silver: "2 seasonal", gold: "2 seasonal", platinum: "2 seasonal", monthly: "1 monthly" },
      },
      {
        label: "Preferred Card Rates",
        plans: { silver: true, gold: true, platinum: true, monthly: true },
        notes: { silver: "$5–$30 off", gold: "$5–$30 off", platinum: "$5–$30 off", monthly: "$5–$30 off rack rates" },
      },
      {
        label: "Members for a Day Access",
        plans: { silver: true, gold: true, platinum: true, monthly: true },
        notes: { silver: "Under $100", gold: "Under $100", platinum: "Under $100", monthly: "Under $100" },
      },
    ],
  },
  {
    category: "Additional Benefits",
    rows: [
      {
        label: "Play Day Discounts",
        plans: { silver: true, gold: true, platinum: true, monthly: true },
        notes: { silver: "Up to $10 off", gold: "Up to $10 off", platinum: "Up to $20 off", monthly: "Up to $10 off" },
      },
      {
        label: "Preferred Event Pricing",
        plans: { silver: false, gold: false, platinum: true, monthly: false },
      },
      {
        label: "Premier Course Access",
        plans: { silver: true, gold: true, platinum: true, monthly: true },
      },
      {
        label: "Merchandise Discounts",
        plans: { silver: true, gold: true, platinum: true, monthly: true },
        notes: { silver: "10% off", gold: "10% off", platinum: "10% off", monthly: "10% off" },
      },
      {
        label: "Online Tee Time Booking",
        plans: { silver: true, gold: true, platinum: true, monthly: true },
        notes: { silver: "Up to 50% off", gold: "Up to 50% off", platinum: "Up to 50% off", monthly: "Up to 50% off" },
      },
      {
        label: "Loyalty Rewards Program",
        plans: { silver: true, gold: true, platinum: true, monthly: true },
      },
    ],
  },
];

// ─── Seasons ───────────────────────────────────────────────────────────────────
const SEASONS = {
  yearRound: {
    label: "Year-Round",
    sublabel: "May 1, 2026 – Apr 30, 2027",
  },
  summer: {
    label: "Summer",
    sublabel: "May 1 – Oct 31, 2026",
  },
  winter: {
    label: "Winter",
    sublabel: "Nov 1, 2026 – Apr 30, 2027",
  },
};

const PLANS = [
  {
    id: "silver",
    name: "Silver",
    tagline: "A great starting point for casual golfers.",
    accentColor: "#7a8fa6",
    pricing: {
      yearRound: { monthly: 24, total: 288, label: "$288 annually" },
      summer:    { monthly: 30, total: 180, label: "$180 seasonal" },
      winter:    { monthly: 23, total: 138, label: "$138 seasonal" },
    },
    highlights: [
      "2 seasonal Double Eagle coupons",
      "$5–$30 off public rates",
      "Members for a Day access",
      "Up to $10 off Play Day events",
    ],
    benefits: {
      cardholder: [
        { label: "Complimentary Rounds", value: "—" },
        { label: "Double Eagle Coupons", value: "2 seasonal coupons ($20–$50 off public rates)" },
        { label: "Preferred Card Rates", value: "$5–$30 off public rates" },
        { label: "Members for a Day", value: "Access to premier participating clubs for under $100" },
      ],
      additional: [
        { label: "Play Day Discounts", value: "Up to $10 off events" },
        { label: "Premier Course Access", value: "Exclusive offers on rounds at premier clubs" },
        { label: "Merchandise Discounts", value: "Up to 10% off" },
        { label: "Online Tee Time Booking", value: "Access to value tee times up to 50% off" },
        { label: "Loyalty Rewards", value: "Earn points through loyalty rewards" },
      ],
    },
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Complimentary rounds and solid savings for regular players.",
    accentColor: "#c9a227",
    badge: "Most Popular",
    pricing: {
      yearRound: { monthly: 29, total: 348, label: "$348 annually" },
      summer:    { monthly: 35, total: 210, label: "$210 seasonal" },
      winter:    { monthly: 28, total: 168, label: "$168 seasonal" },  // corrected from PDF ($160 → $168 based on $28×6)
    },
    highlights: [
      "1 summer + 1 winter round at Heritage Isles",
      "2 seasonal Double Eagle coupons",
      "$5–$30 off public rates",
      "Up to $10 off Play Day events",
    ],
    benefits: {
      cardholder: [
        { label: "Complimentary Rounds", value: "1 summer + 1 winter round at Heritage Isles" },
        { label: "Double Eagle Coupons", value: "2 seasonal coupons ($20–$50 off public rates)" },
        { label: "Preferred Card Rates", value: "$5–$30 off public rates" },
        { label: "Members for a Day", value: "Access to premier participating clubs for under $100" },
      ],
      additional: [
        { label: "Play Day Discounts", value: "Up to $10 off events" },
        { label: "Premier Course Access", value: "Exclusive offers on rounds at premier clubs" },
        { label: "Merchandise Discounts", value: "Up to 10% off" },
        { label: "Online Tee Time Booking", value: "Access to value tee times up to 50% off" },
        { label: "Loyalty Rewards", value: "Earn points through loyalty rewards" },
      ],
    },
  },
  {
    id: "platinum",
    name: "Platinum",
    tagline: "Maximum perks and event savings for the dedicated golfer.",
    accentColor: "#6a5acd",
    pricing: {
      yearRound: { monthly: 34, total: 408, label: "$408 annually" },
      summer:    { monthly: 40, total: 240, label: "$240 seasonal" },
      winter:    { monthly: 33, total: 198, label: "$198 seasonal" },
    },
    highlights: [
      "Rounds at Heritage Isles & Citrus National",
      "2 seasonal Double Eagle coupons",
      "Up to $20 off Play Day events",
      "Preferred Event Pricing",
    ],
    benefits: {
      cardholder: [
        { label: "Complimentary Rounds", value: "1 summer + 1 winter at Heritage Isles · 1 summer + 1 winter at Citrus National" },
        { label: "Double Eagle Coupons", value: "2 seasonal coupons ($20–$50 off public rates)" },
        { label: "Preferred Card Rates", value: "$5–$30 off public rates" },
        { label: "Members for a Day", value: "Access to premier participating clubs for under $100" },
      ],
      additional: [
        { label: "Play Day Discounts", value: "Up to $20 off events with Preferred Event Pricing" },
        { label: "Premier Course Access", value: "Exclusive offers on rounds at premier clubs" },
        { label: "Merchandise Discounts", value: "Up to 10% off" },
        { label: "Online Tee Time Booking", value: "Access to value tee times up to 50% off" },
        { label: "Loyalty Rewards", value: "Earn points through loyalty rewards" },
      ],
    },
  },
  {
    id: "monthly",
    name: "Monthly",
    tagline: "Flexible month-to-month with no long-term commitment.",
    accentColor: "#2e8b6e",
    pricing: {
      yearRound: null,
      summer:    { monthly: 45, total: null, label: "+ $20 activation fee", activation: true },
      winter:    { monthly: 40, total: null, label: "+ $20 activation fee", activation: true },
    },
    highlights: [
      "No annual commitment",
      "1 monthly Double Eagle coupon",
      "$5–$30 off rack rates",
      "Members for a Day access",
    ],
    benefits: {
      cardholder: [
        { label: "Complimentary Rounds", value: "—" },
        { label: "Double Eagle Coupons", value: "1 monthly coupon ($20–$50 off public rates)" },
        { label: "Preferred Card Rates", value: "$5–$30 off rack rates" },
        { label: "Members for a Day", value: "Access to premier participating clubs for under $100" },
      ],
      additional: [
        { label: "Play Day Discounts", value: "Up to $10 off events" },
        { label: "Premier Course Access", value: "Exclusive offers on rounds at premier clubs" },
        { label: "Merchandise Discounts", value: "Up to 10% off" },
        { label: "Online Tee Time Booking", value: "Access to value tee times up to 50% off" },
        { label: "Loyalty Rewards", value: "Earn points through loyalty rewards" },
      ],
    },
  },
];
