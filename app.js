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

function buildComparisonTable() {
  const planIds = PLANS.map(p => p.id);

  // Column headers with accent color dot
  const headerCells = PLANS.map(p =>
    `<th>
      <span class="col-dot" style="background:${p.accentColor}"></span>
      ${p.name}
    </th>`
  ).join("");

  // Build rows grouped by category
  const bodyRows = COMPARISON.map(group => {
    const groupHeader = `
      <tr class="category-row">
        <td colspan="${PLANS.length + 1}">${group.category}</td>
      </tr>`;

    const dataRows = group.rows.map(row => {
      const cells = planIds.map(id => {
        const has  = row.plans[id];
        const note = row.notes?.[id] ?? "";
        return has
          ? `<td class="cell-yes" aria-label="Included">
               <span class="check">✓</span>
               ${note ? `<span class="cell-note">${note}</span>` : ""}
             </td>`
          : `<td class="cell-no" aria-label="Not included">
               <span class="cross">✕</span>
             </td>`;
      }).join("");

      return `<tr><td class="benefit-name">${row.label}</td>${cells}</tr>`;
    }).join("");

    return groupHeader + dataRows;
  }).join("");

  return `
    <div class="comparison-wrapper">
      <table class="comparison-table" role="table" aria-label="Full plan comparison">
        <thead>
          <tr>
            <th class="corner-cell">Benefit</th>
            ${headerCells}
          </tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
}

function renderComparisonTable() {
  document.getElementById("comparisonTable").innerHTML = buildComparisonTable();
}

renderCards(currentSeason);
initSeasonTabs();
renderComparisonTable();
