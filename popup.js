document.addEventListener("DOMContentLoaded", async () => {
  const statusEl = document.getElementById("status");
  const statusText = document.getElementById("statusText");
  const totalChecksEl = document.getElementById("totalChecks");
  const lastCheckEl = document.getElementById("lastCheck");

  const settings = await chrome.storage.sync.get(["provider", "groqApiKey", "ollamaBaseUrl"]);
  const local = await chrome.storage.local.get(["totalChecks", "lastCheck"]);

  totalChecksEl.textContent = local.totalChecks || 0;

  if (local.lastCheck) {
    const d = new Date(local.lastCheck);
    lastCheckEl.textContent = d.toLocaleDateString();
  }

  const provider = settings.provider || "groq";
  if (provider === "groq" && settings.groqApiKey) {
    statusEl.classList.add("ready");
    statusText.textContent = "Ready (Groq)";
  } else if (provider === "ollama") {
    statusEl.classList.add("ready");
    statusText.textContent = "Ready (Ollama)";
  } else {
    statusEl.classList.add("error");
    statusText.textContent = "API key not set — click Settings";
  }

  document.getElementById("optionsBtn").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
});
