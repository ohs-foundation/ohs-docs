(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function setupDrawer() {
    const toggle = $(".sidebar-toggle");
    const sidebar = $(".sidebar");
    const close = $(".sidebar-mobile-head button");
    if (!toggle || !sidebar) return;
    const backdrop = document.createElement("button");
    backdrop.className = "sidebar-backdrop"; backdrop.setAttribute("aria-label", "Close documentation navigation");
    const open = () => { sidebar.classList.add("open"); document.body.append(backdrop); toggle.setAttribute("aria-expanded", "true"); close?.focus(); };
    const shut = () => { sidebar.classList.remove("open"); backdrop.remove(); toggle.setAttribute("aria-expanded", "false"); toggle.focus(); };
    toggle.addEventListener("click", open); close?.addEventListener("click", shut); backdrop.addEventListener("click", shut);
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && sidebar.classList.contains("open")) shut(); });
  }

  function setupMenu() {
    const button = $(".menu-button"); const nav = $(".main-nav");
    if (!button || !nav) return;
    button.addEventListener("click", () => { const open = nav.classList.toggle("open"); button.setAttribute("aria-expanded", String(open)); });
  }

  function setupTabs() {
    const commands = { Desktop: "./gradlew :ohs-player-reference-app:run", Android: "./gradlew :ohs-player-reference-app:assembleDebug", Web: "./gradlew :ohs-player-reference-app:wasmJsBrowserDevelopmentRun" };
    const tabs = $$(".target-tabs button"); if (!tabs.length) return;
    const code = $("#target-panel .code-block code");
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((item) => { item.classList.remove("active"); item.setAttribute("aria-selected", "false"); });
      tab.classList.add("active"); tab.setAttribute("aria-selected", "true");
      if (code) code.innerHTML = `<span>$</span> ${commands[tab.textContent.trim()]}`;
    }));
  }

  function setupCopy() {
    $$(".code-block").forEach((block) => {
      const button = $("button", block); const code = $("code", block); if (!button || !code) return;
      button.addEventListener("click", async () => { await navigator.clipboard?.writeText(code.textContent.replace(/^\$\s*/, "")); button.textContent = "Copied"; setTimeout(() => button.textContent = "Copy", 1200); });
    });
  }

  function setupVersion() {
    const button = $(".version-button"); if (!button) return;
    button.addEventListener("click", () => {
      const existing = $(".version-popover"); if (existing) { existing.remove(); button.setAttribute("aria-expanded", "false"); return; }
      const popover = document.createElement("div"); popover.className = "version-popover";
      popover.innerHTML = "<strong>Portal preview v0.2</strong><span>Reference client: main</span><span>Validated: 15 July 2026</span>";
      button.parentElement.append(popover); button.setAttribute("aria-expanded", "true");
    });
  }

  function setupFeedback() {
    const wrap = $(".article-feedback"); if (!wrap) return;
    $$("button", wrap).forEach((button) => button.addEventListener("click", () => { $("span", wrap).textContent = "Thanks — feedback recorded."; $$("button", wrap).forEach((item) => item.remove()); }));
  }

  function setupAskPreview() {
    $$(".ask-button, .preview-feature").forEach((button) => button.addEventListener("click", () => {
      if ($(".ask-backdrop")) return;
      const backdrop = document.createElement("div"); backdrop.className = "ask-backdrop";
      backdrop.innerHTML = `<aside class="ask-drawer" role="dialog" aria-modal="true" aria-label="Ask OHS"><div class="ask-head"><div><span class="ai-spark">AI</span><span><strong>Ask OHS</strong><small>Documentation assistant · Preview</small></span></div><button type="button" aria-label="Close Ask OHS">×</button></div><div class="ask-concept"><strong>Concept preview — not a live assistant.</strong><span>Launch requires authoritative, version-aware, source-cited answers.</span></div><div class="chat-thread"><div class="user-message">Which components do I need for an offline Android app with access control?</div><div class="assistant-message"><span class="ai-spark small">AI</span><div><p>Start with the OHS Player reference client and place FHIR Gateway in front of the FHIR server for organizational access policies.</p><div class="sources"><span>EXAMPLE SOURCES</span><a href="https://github.com/ohs-foundation/ohs-player-reference-client-app">Reference client repository</a></div></div></div></div><form class="ask-input disabled"><input disabled placeholder="Available after source integration"/><button disabled>↑</button></form><div class="ask-foot">Concept only. External source links require internet access.</div></aside>`;
      document.body.append(backdrop); const close = $(".ask-head button", backdrop);
      const shut = () => { backdrop.remove(); button.focus(); };
      close.addEventListener("click", shut); backdrop.addEventListener("click", (event) => { if (event.target === backdrop) shut(); }); close.focus();
    }));
  }

  function setupSearch() {
    const input = $(".header-search input, .search-box input"); if (!input) return;
    const host = input.closest(".header-search, .search-box");
    const items = [
      ["Run the OHS Player reference client", "Quickstart", location.pathname.includes("initial") ? "../index.html" : "./index.html"],
      ["OHS technical architecture", "Concept", location.pathname.includes("initial") ? "#architecture" : "./initial/index.html#architecture"],
      ["Choose OHS components", "Guide", location.pathname.includes("initial") ? "#components" : "./initial/index.html#components"]
    ];
    const show = () => {
      let popover = $(".search-popover, .search-results", host);
      if (!popover) { popover = document.createElement("div"); popover.className = host.classList.contains("search-box") ? "search-results" : "search-popover"; host.append(popover); }
      const query = input.value.toLowerCase(); const matches = items.filter(([title]) => title.toLowerCase().includes(query));
      popover.innerHTML = `<div class="search-popover-head search-results-head"><span>${query ? "Matching documentation" : "Suggested documentation"}</span><button type="button">Close</button></div>${matches.map(([title,type,href]) => `<a href="${href}"><span class="result-icon result-dot">${type[0]}</span><span><strong>${title}</strong><small>Technical docs</small></span><b>${type}</b></a>`).join("") || '<p class="no-results empty-search">No matching page in this prototype.</p>'}`;
      $("button", popover).addEventListener("click", () => popover.remove());
    };
    input.addEventListener("focus", show); input.addEventListener("input", show);
    document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); input.focus(); show(); } });
  }

  function setupComparison() {
    const desktop = $$(".view-switch button").find((button) => button.textContent.trim() === "Desktop");
    const mobile = $$(".view-switch button").find((button) => button.textContent.trim() === "Mobile");
    if (!desktop || !mobile) return;
    const set = (mode) => { $$(".comparison-frame").forEach((frame) => { frame.classList.remove("desktop", "mobile"); frame.classList.add(mode); }); desktop.classList.toggle("active", mode === "desktop"); mobile.classList.toggle("active", mode === "mobile"); };
    desktop.addEventListener("click", () => set("desktop")); mobile.addEventListener("click", () => set("mobile"));
    const checkbox = $('.comparison-controls input[type="checkbox"]'); let syncing = false;
    checkbox?.addEventListener("change", () => {
      if (!checkbox.checked) return;
      const frames = $$(".comparison-frame iframe").map((frame) => frame.contentWindow);
      frames.forEach((source, index) => source.addEventListener("scroll", () => { if (syncing || !checkbox.checked) return; syncing = true; const target = frames[1-index]; const range = Math.max(1, source.document.documentElement.scrollHeight - source.innerHeight); const targetRange = Math.max(0, target.document.documentElement.scrollHeight - target.innerHeight); target.scrollTo(0, source.scrollY / range * targetRange); requestAnimationFrame(() => syncing = false); }, { passive: true }));
    });
  }

  setupDrawer(); setupMenu(); setupTabs(); setupCopy(); setupVersion(); setupFeedback(); setupAskPreview(); setupSearch(); setupComparison();
})();
