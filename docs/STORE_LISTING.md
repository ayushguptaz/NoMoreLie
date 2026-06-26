# Chrome Web Store Listing — NoMoreLie

Copy/paste content for the Developer Dashboard submission.

## Product details

**Title** (from package): `NoMoreLie`

**Summary** (from package): `AI-powered fact-checker. Select text on any page to verify claims instantly.`

**Category:** Productivity

**Language:** English (United States)

### Description

```
NoMoreLie is an AI-powered fact-checker that lives in your browser. Select any text on any web page — a news headline, a social media post, a forum comment, a product claim — and instantly verify whether it holds up.

HOW IT WORKS
1. Select text on any web page.
2. Right-click and choose "Fact Check with NoMoreLie".
3. NoMoreLie breaks the text into individual claims and returns a clear verdict for each, with a short explanation and a confidence score.

VERDICTS YOU CAN TRUST AT A GLANCE
• True — the claim is accurate
• False — the claim is inaccurate
• Partially True — a mix of accurate and inaccurate elements
• Unverifiable — can't be assessed (opinions, private data, or real-time information)

Each result includes an overall summary plus a per-claim breakdown with a color-coded confidence bar, so you can quickly judge how strong the assessment is.

CHOOSE YOUR AI PROVIDER
• Groq (free tier) — fast, cloud-based checking. Just add a free API key.
• Ollama (local) — run everything on your own machine, fully offline, for maximum privacy.

PRIVACY FIRST
• Your API key and settings are stored locally in your browser.
• Fact-check requests are sent only to the provider you choose (Groq or your local Ollama server).
• NoMoreLie does not sell your data or show ads.
• Prefer total privacy? Use the local Ollama option and nothing ever leaves your computer.

WHY YOU'LL LOVE IT
• Works on any website
• Clean, distraction-free results panel
• No account required
• Lightweight and fast

IMPORTANT NOTE
NoMoreLie uses an AI language model to assess claims based on its training knowledge. It does not perform live web searches and may mark recent or niche claims as "Unverifiable." Treat results as a helpful starting point for your own judgment, not as definitive proof.

Get started in seconds — install NoMoreLie, add your free Groq API key (or point it at Ollama), and start fact-checking the web.
```

## Graphic assets

- **Store icon:** `docs/store-icon-128.png` (128x128)
- **Screenshots (1280x800):** `docs/screenshot-tooltip-1280x800.png`, `docs/screenshot-results-1280x800.png`, `docs/screenshot-settings-1280x800.png`
- **Small promo tile (optional):** `docs/promo-small-440x280.png` (440x280)
- **Marquee promo tile (optional):** `docs/promo-marquee-1400x560.png` (1400x560)

## Privacy practices tab

**Single purpose:**
```
NoMoreLie lets users fact-check text they select on a web page. When the user clicks the right-click "Fact Check with NoMoreLie" menu item, the extension sends the selected text to an AI language model (Groq or a local Ollama server) and displays a verdict, explanation, and confidence score for each claim.
```

**Permission justifications:**
- `contextMenus` — Adds a right-click "Fact Check with NoMoreLie" menu item for selected text.
- `storage` — Stores the user's chosen AI provider, API key, model, and usage stats locally.
- `activeTab` — Grants temporary access to the active tab only when the user clicks the context-menu item, so the results panel can be shown on that page.
- `scripting` — Injects the results-panel UI into the active tab on demand (only after the user invokes the context menu); the extension has no always-on content script.
- Host permission `https://api.groq.com/*` — Sends the selected text to the Groq API when the user chooses Groq.
- Host permission `http://localhost:11434/*` — Sends the selected text to a local Ollama server when the user chooses Ollama.

**Remote code use:** Select "No, I am not using remote code." If a justification is required:
```
The extension does not load or execute any remotely hosted code. All JavaScript is bundled in the package. Network requests only send text to the configured AI provider and receive JSON data (verdicts) in response; that data is parsed, never executed as code.
```

**Certification checkboxes:**
- I do not sell or transfer user data to third parties outside the approved use cases.
- I do not use or transfer user data for purposes unrelated to the item's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending.

**Settings page (account-level):**
- Provide a publisher contact email.
- Verify that email via the link Google sends.

**Data usage disclosure:**
- Collects "Website content" (the text the user selects) and transmits it to the user-selected AI provider (Groq or local Ollama) to perform the fact-check.
- Does NOT sell or transfer data to third parties for unrelated purposes.
- Does NOT use the data for advertising, creditworthiness, or lending.

**Privacy policy URL:** https://ayushguptaz.github.io/NoMoreLie/privacy.html
