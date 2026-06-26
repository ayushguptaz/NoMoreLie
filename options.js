document.addEventListener("DOMContentLoaded", async () => {
  const providerRadios = document.querySelectorAll('input[name="provider"]');
  const groqSection = document.getElementById("groqSection");
  const ollamaSection = document.getElementById("ollamaSection");
  const saveBtn = document.getElementById("saveBtn");
  const saveStatus = document.getElementById("saveStatus");

  function toggleSections() {
    const provider = document.querySelector('input[name="provider"]:checked').value;
    groqSection.style.display = provider === "groq" ? "" : "none";
    ollamaSection.style.display = provider === "ollama" ? "" : "none";
  }

  providerRadios.forEach(r => r.addEventListener("change", toggleSections));

  const settings = await chrome.storage.sync.get([
    "provider", "groqApiKey", "groqModel",
    "ollamaBaseUrl", "ollamaModel"
  ]);

  if (settings.provider) {
    document.querySelector(`input[name="provider"][value="${settings.provider}"]`).checked = true;
  }
  if (settings.groqApiKey) document.getElementById("groqApiKey").value = settings.groqApiKey;
  if (settings.groqModel) document.getElementById("groqModel").value = settings.groqModel;
  if (settings.ollamaBaseUrl) document.getElementById("ollamaBaseUrl").value = settings.ollamaBaseUrl;
  if (settings.ollamaModel) document.getElementById("ollamaModel").value = settings.ollamaModel;

  toggleSections();

  saveBtn.addEventListener("click", async () => {
    const data = {
      provider: document.querySelector('input[name="provider"]:checked').value,
      groqApiKey: document.getElementById("groqApiKey").value.trim(),
      groqModel: document.getElementById("groqModel").value,
      ollamaBaseUrl: document.getElementById("ollamaBaseUrl").value.trim() || "http://localhost:11434",
      ollamaModel: document.getElementById("ollamaModel").value.trim() || "llama3"
    };

    await chrome.storage.sync.set(data);
    saveStatus.textContent = "Saved!";
    setTimeout(() => { saveStatus.textContent = ""; }, 2000);
  });
});
