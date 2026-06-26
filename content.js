(function () {
  "use strict";

  if (window.__nomoreLieLoaded) return;
  window.__nomoreLieLoaded = true;

  let hostEl = null;
  let shadow = null;

  function getStyles() {
    return `
      * { box-sizing: border-box; margin: 0; padding: 0; }

      .nml-panel {
        width: 380px;
        max-height: 480px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        color: #1e293b;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .nml-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solid #e2e8f0;
        background: #f8fafc;
      }
      .nml-header-title {
        font-weight: 700;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .nml-header-title svg {
        width: 16px;
        height: 16px;
      }
      .nml-close-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        color: #64748b;
        font-size: 18px;
        line-height: 1;
      }
      .nml-close-btn:hover {
        background: #e2e8f0;
        color: #1e293b;
      }

      .nml-body {
        padding: 12px 16px;
        overflow-y: auto;
        flex: 1;
      }

      .nml-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 32px 16px;
        color: #64748b;
      }
      .nml-spinner {
        width: 28px;
        height: 28px;
        border: 3px solid #e2e8f0;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: nml-spin 0.8s linear infinite;
      }
      @keyframes nml-spin {
        to { transform: rotate(360deg); }
      }

      .nml-error {
        padding: 12px;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        color: #dc2626;
        font-size: 12px;
        line-height: 1.5;
      }

      .nml-summary {
        margin-bottom: 12px;
        padding: 10px 12px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .nml-summary.verdict-true { background: #f0fdf4; border: 1px solid #bbf7d0; }
      .nml-summary.verdict-false { background: #fef2f2; border: 1px solid #fecaca; }
      .nml-summary.verdict-partial { background: #fffbeb; border: 1px solid #fde68a; }
      .nml-summary.verdict-unknown { background: #f8fafc; border: 1px solid #e2e8f0; }

      .nml-verdict-badge {
        display: inline-flex;
        align-items: center;
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        white-space: nowrap;
      }
      .nml-verdict-badge.verdict-true { background: #dcfce7; color: #166534; }
      .nml-verdict-badge.verdict-false { background: #fee2e2; color: #991b1b; }
      .nml-verdict-badge.verdict-partial { background: #fef3c7; color: #92400e; }
      .nml-verdict-badge.verdict-unknown { background: #f1f5f9; color: #475569; }

      .nml-summary-text {
        font-size: 13px;
        line-height: 1.4;
        color: #374151;
      }

      .nml-claims-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .nml-claim {
        padding: 10px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        transition: border-color 0.15s;
      }
      .nml-claim:hover { border-color: #cbd5e1; }

      .nml-claim-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 6px;
      }
      .nml-claim-statement {
        font-size: 12px;
        line-height: 1.4;
        color: #1e293b;
        font-weight: 500;
        flex: 1;
      }

      .nml-claim-explanation {
        font-size: 11px;
        color: #64748b;
        line-height: 1.4;
        margin-top: 4px;
      }

      .nml-confidence-bar {
        margin-top: 6px;
        height: 3px;
        background: #e2e8f0;
        border-radius: 2px;
        overflow: hidden;
      }
      .nml-confidence-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.3s;
      }
      .nml-confidence-fill.high { background: #22c55e; }
      .nml-confidence-fill.medium { background: #f59e0b; }
      .nml-confidence-fill.low { background: #ef4444; }

      .nml-footer {
        padding: 8px 16px;
        border-top: 1px solid #e2e8f0;
        font-size: 11px;
        color: #94a3b8;
        text-align: center;
      }
    `;
  }

  const SHIELD_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/></svg>`;

  function initShadowHost() {
    if (hostEl) return;
    hostEl = document.createElement("div");
    hostEl.id = "nml-host";
    shadow = hostEl.attachShadow({ mode: "closed" });

    const style = document.createElement("style");
    style.textContent = getStyles();
    shadow.appendChild(style);

    document.body.appendChild(hostEl);
  }

  function removeExisting(selector) {
    if (!shadow) return;
    const el = shadow.querySelector(selector);
    if (el) el.remove();
  }

  function hideAll() {
    if (!hostEl) return;
    removeExisting(".nml-panel");
    hostEl.style.cssText = "position:fixed;z-index:2147483647;display:none;";
  }

  function showPanel(content) {
    initShadowHost();
    removeExisting(".nml-panel");
    hostEl.style.cssText = "position:fixed;top:16px;right:16px;z-index:2147483647;";

    const panel = document.createElement("div");
    panel.className = "nml-panel";

    const header = document.createElement("div");
    header.className = "nml-header";
    header.innerHTML = `
      <span class="nml-header-title">${SHIELD_SVG} NoMoreLie</span>
    `;
    const closeBtn = document.createElement("button");
    closeBtn.className = "nml-close-btn";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", hideAll);
    header.appendChild(closeBtn);

    const body = document.createElement("div");
    body.className = "nml-body";
    body.appendChild(content);

    const footer = document.createElement("div");
    footer.className = "nml-footer";
    footer.textContent = "Powered by NoMoreLie";

    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(footer);
    shadow.appendChild(panel);
  }

  function renderLoading() {
    const div = document.createElement("div");
    div.className = "nml-loading";
    div.innerHTML = `<div class="nml-spinner"></div><span>Analyzing claims…</span>`;
    return div;
  }

  function renderError(message) {
    const div = document.createElement("div");
    div.className = "nml-error";
    div.textContent = message;
    return div;
  }

  function verdictClass(verdict) {
    const v = (verdict || "").toLowerCase();
    if (v === "true") return "verdict-true";
    if (v === "false") return "verdict-false";
    if (v.includes("partial")) return "verdict-partial";
    return "verdict-unknown";
  }

  function renderResults(data) {
    const container = document.createElement("div");

    const summary = document.createElement("div");
    summary.className = `nml-summary ${verdictClass(data.overallVerdict)}`;
    summary.innerHTML = `
      <span class="nml-verdict-badge ${verdictClass(data.overallVerdict)}">${data.overallVerdict || "Unknown"}</span>
      <span class="nml-summary-text">${escapeHtml(data.summary || "")}</span>
    `;
    container.appendChild(summary);

    if (data.claims && data.claims.length) {
      const list = document.createElement("div");
      list.className = "nml-claims-list";

      for (const claim of data.claims) {
        const el = document.createElement("div");
        el.className = "nml-claim";

        const confidence = claim.confidence || 0;
        const confLevel = confidence >= 0.7 ? "high" : confidence >= 0.4 ? "medium" : "low";

        el.innerHTML = `
          <div class="nml-claim-header">
            <span class="nml-claim-statement">${escapeHtml(claim.statement)}</span>
            <span class="nml-verdict-badge ${verdictClass(claim.verdict)}">${escapeHtml(claim.verdict)}</span>
          </div>
          <div class="nml-claim-explanation">${escapeHtml(claim.explanation || "")}</div>
          <div class="nml-confidence-bar">
            <div class="nml-confidence-fill ${confLevel}" style="width:${confidence * 100}%"></div>
          </div>
        `;
        list.appendChild(el);
      }
      container.appendChild(list);
    }

    return container;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  document.addEventListener("mousedown", (e) => {
    if (hostEl && shadow) {
      const path = e.composedPath();
      if (!path.includes(hostEl)) {
        hideAll();
      }
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "FACT_CHECK_LOADING") {
      showPanel(renderLoading());
    } else if (message.type === "FACT_CHECK_RESULT") {
      showPanel(renderResults(message.payload));
    } else if (message.type === "FACT_CHECK_ERROR") {
      showPanel(renderError(message.payload.message));
    }
  });
})();
