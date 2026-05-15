let currentSeason = "yearRound";

function buildPriceBlock(pricing, season) {
  const p = pricing[season];

  if (!p) {
    return `<div class="card-pricing">
      <p class="price-unavailable">Not available for this season</p>
    </div>`;
  }

  const totalLine = p.activation
    ? `<p class="price-total">+ $20 one-time activation fee</p>`
    : p.total
    ? `<p class="price-total">${p.label}</p>`
    : "";

  return `<div class="card-pricing">
    <div class="price-main">
      <span class="price-dollar">$</span>
      <span class="price-amount">${p.monthly}</span>
      <span class="price-period">/mo</span>
    </div>
    ${totalLine}
  </div>`;
}

function buildBenefitRows(items) {
  return items.map(({ label, value }) => {
    const isNone = value === "—";
    return `<div class="benefit-row">
      <span class="benefit-label">${label}</span>
      <span class="benefit-value${isNone ? " none" : ""}">${value}</span>
    </div>`;
  }).join("");
}

function buildCard(plan, season) {
  const badgeHtml = plan.badge
    ? `<span class="badge">${plan.badge}</span><br>`
    : "";

  return `
    <article class="plan-card" data-plan="${plan.id}">
      <div class="card-accent-bar" style="background:${plan.accentColor}"></div>

      <div class="card-header">
        ${badgeHtml}
        <h2 class="plan-name">${plan.name}</h2>
        <p class="plan-tagline">${plan.tagline}</p>
      </div>

      ${buildPriceBlock(plan.pricing, season)}

      <div class="card-highlights">
        <p class="highlights-title">Key benefits</p>
        <ul class="highlights-list">
          ${plan.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>
      </div>

      <button class="expand-btn" aria-expanded="false" aria-controls="benefits-${plan.id}">
        View all benefits <i class="expand-icon">▼</i>
      </button>

      <div class="benefits-panel" id="benefits-${plan.id}">
        <p class="benefits-section-title">Cardholder Benefits</p>
        ${buildBenefitRows(plan.benefits.cardholder)}
        <p class="benefits-section-title">Additional Benefits</p>
        ${buildBenefitRows(plan.benefits.additional)}
      </div>
    </article>
  `;
}

function renderCards(season) {
  const grid = document.getElementById("plansGrid");
  grid.innerHTML = PLANS.map(plan => buildCard(plan, season)).join("");

  grid.querySelectorAll(".expand-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panelId  = btn.getAttribute("aria-controls");
      const panel    = document.getElementById(panelId);

      btn.setAttribute("aria-expanded", String(!expanded));
      panel.classList.toggle("open", !expanded);
      btn.querySelector(".expand-btn span, i").textContent = expanded ? "▼" : "▲";
    });
  });
}

function initSeasonTabs() {
  document.querySelectorAll(".season-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".season-tab").forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      currentSeason = tab.dataset.season;
      renderCards(currentSeason);
    });
  });
}

renderCards(currentSeason);
initSeasonTabs();
