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

// Plans selected for comparison — all shown by default
let selectedPlanIds = PLANS.map(p => p.id);

function buildComparisonControls() {
  const toggles = PLANS.map(p => {
    const isActive = selectedPlanIds.includes(p.id);
    return `
      <button
        class="compare-toggle ${isActive ? "active" : ""}"
        data-plan-id="${p.id}"
        style="--accent: ${p.accentColor}"
        aria-pressed="${isActive}"
      >${p.name}</button>`;
  }).join("");

  return `
    <div class="compare-controls">
      <span class="compare-label">Select plans to compare:</span>
      <div class="compare-toggles">${toggles}</div>
    </div>`;
}

function buildComparisonTable() {
  const plans = PLANS.filter(p => selectedPlanIds.includes(p.id));

  if (plans.length < 2) {
    return `<p class="compare-hint">Select at least 2 plans to compare.</p>`;
  }

  const headerCells = plans.map(p =>
    `<th>
      <span class="col-dot" style="background:${p.accentColor}"></span>
      ${p.name}
    </th>`
  ).join("");

  const bodyRows = COMPARISON.map(group => {
    const groupHeader = `
      <tr class="category-row">
        <td colspan="${plans.length + 1}">${group.category}</td>
      </tr>`;

    const dataRows = group.rows.map(row => {
      const cells = plans.map(({ id }) => {
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
      <table class="comparison-table" role="table" aria-label="Plan comparison">
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
  const container = document.getElementById("comparisonTable");
  container.innerHTML = buildComparisonControls() + buildComparisonTable();

  container.querySelectorAll(".compare-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.planId;

      if (selectedPlanIds.includes(id)) {
        // Don't allow deselecting below 2
        if (selectedPlanIds.length <= 2) return;
        selectedPlanIds = selectedPlanIds.filter(p => p !== id);
      } else {
        selectedPlanIds = [...selectedPlanIds, id];
      }

      renderComparisonTable();
    });
  });
}

// ─── Quiz ────────────────────────────────────────────────────────────────────

function initQuiz() {
  const trigger = document.getElementById("quizTrigger");
  const panel   = document.getElementById("quizPanel");

  trigger.addEventListener("click", () => {
    const isOpen = panel.classList.contains("open");
    if (isOpen) {
      closeQuiz();
    } else {
      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
      trigger.classList.add("active");
      renderQuizStep(0, {});
    }
  });
}

function closeQuiz() {
  const panel   = document.getElementById("quizPanel");
  const trigger = document.getElementById("quizTrigger");
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  trigger.classList.remove("active");
}

function renderQuizStep(stepIndex, scores) {
  const inner    = document.getElementById("quizInner");
  const question = QUIZ.questions[stepIndex];
  const total    = QUIZ.questions.length;

  const progressDots = QUIZ.questions.map((_, i) =>
    `<span class="progress-dot ${i < stepIndex ? "done" : i === stepIndex ? "active" : ""}"></span>`
  ).join("");

  const optionButtons = question.options.map(opt => `
    <button class="quiz-option" data-step="${stepIndex}" data-scores='${JSON.stringify(opt.scores)}'>
      <span class="option-icon">${opt.icon}</span>
      <span class="option-label">${opt.label}</span>
    </button>
  `).join("");

  inner.innerHTML = `
    <div class="quiz-step">
      <div class="quiz-progress">
        <span class="progress-label">Question ${stepIndex + 1} of ${total}</span>
        <div class="progress-dots">${progressDots}</div>
      </div>
      <p class="quiz-question">${question.text}</p>
      <div class="quiz-options">${optionButtons}</div>
    </div>
  `;

  inner.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const picked     = JSON.parse(btn.dataset.scores);
      const newScores  = {};

      PLANS.forEach(p => {
        newScores[p.id] = (scores[p.id] || 0) + (picked[p.id] || 0);
      });

      const nextStep = stepIndex + 1;
      if (nextStep < QUIZ.questions.length) {
        renderQuizStep(nextStep, newScores);
      } else {
        renderQuizResult(newScores);
      }
    });
  });
}

function renderQuizResult(scores) {
  const inner = document.getElementById("quizInner");

  // Find the plan with the highest score (tie → first one wins, which is cheaper)
  const winner = PLANS.reduce((best, plan) =>
    (scores[plan.id] || 0) > (scores[best.id] || 0) ? plan : best
  , PLANS[0]);

  const reason = QUIZ.reasons[winner.id];

  inner.innerHTML = `
    <div class="quiz-result">
      <p class="result-label">We recommend</p>
      <div class="result-plan-name" style="color:${winner.accentColor}">
        ${winner.name} Cardholder
      </div>
      <p class="result-reason">${reason}</p>
      <div class="result-actions">
        <button class="result-scroll-btn" id="scrollToplan" data-plan="${winner.id}"
          style="background:${winner.accentColor}">
          View ${winner.name} plan ↓
        </button>
        <button class="result-retake-btn" id="retakeQuiz">Retake quiz</button>
      </div>
    </div>
  `;

  document.getElementById("scrollToplan").addEventListener("click", () => {
    closeQuiz();
    const card = document.querySelector(`.plan-card[data-plan="${winner.id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("highlighted");
      setTimeout(() => card.classList.remove("highlighted"), 2000);
    }
  });

  document.getElementById("retakeQuiz").addEventListener("click", () => {
    renderQuizStep(0, {});
  });
}

renderCards(currentSeason);
initSeasonTabs();
renderComparisonTable();
initQuiz();
