import { SYSTEM_PROMPT, buildUserPrompt } from "./lib/prompts.js";
import { callGroq, callOllama } from "./lib/providers.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "nomoreLie-factcheck",
    title: "Fact Check with NoMoreLie",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "nomoreLie-factcheck" && info.selectionText && tab?.id != null) {
    const ready = await ensureContentScript(tab.id);
    if (!ready) return;
    performFactCheck(info.selectionText, tab.url, tab.id);
  }
});

async function ensureContentScript(tabId) {
  try {
    await chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] });
    return true;
  } catch (e) {
    return false;
  }
}

async function performFactCheck(text, pageUrl, tabId) {
  chrome.tabs.sendMessage(tabId, { type: "FACT_CHECK_LOADING" });

  try {
    const settings = await chrome.storage.sync.get([
      "provider", "groqApiKey", "groqModel", "ollamaBaseUrl", "ollamaModel"
    ]);

    const truncatedText = text.length > 4000 ? text.slice(0, 4000) + "..." : text;

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(truncatedText, pageUrl) }
    ];

    let rawResult;
    if (settings.provider === "ollama") {
      rawResult = await callOllama(messages, settings.ollamaBaseUrl, settings.ollamaModel);
    } else {
      rawResult = await callGroq(messages, settings.groqApiKey, settings.groqModel);
    }

    const parsed = parseResponse(rawResult);
    parsed.originalText = truncatedText;

    chrome.tabs.sendMessage(tabId, { type: "FACT_CHECK_RESULT", payload: parsed });

    chrome.storage.local.set({
      lastResult: parsed,
      lastCheck: new Date().toISOString(),
      totalChecks: ((await chrome.storage.local.get("totalChecks")).totalChecks || 0) + 1
    });
  } catch (err) {
    chrome.tabs.sendMessage(tabId, { type: "FACT_CHECK_ERROR", payload: { message: err.message } });
  }
}

function parseResponse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("Failed to parse fact-check response. The AI returned an invalid format.");
  }
}
