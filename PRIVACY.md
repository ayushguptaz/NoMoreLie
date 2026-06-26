# Privacy Policy — NoMoreLie

**Last updated: June 26, 2026**

NoMoreLie ("the extension") is a browser extension that fact-checks text you select on web pages using an AI language model. This policy explains what data the extension handles and how.

## Summary

- NoMoreLie does **not** have its own servers and does **not** collect, store, or transmit your data to the developer.
- The only data leaving your browser is the text you explicitly choose to fact-check, which is sent to the AI provider **you** configure.
- Your settings (including your API key) are stored locally in your browser.
- NoMoreLie does not sell your data, show ads, or run analytics/tracking.

## Data the extension handles

### 1. Selected text ("Website content")
When you click **Fact Check** (via the floating button or right-click menu), the text you selected is sent to the AI provider you have configured so it can be analyzed. This text is only sent when you explicitly trigger a fact-check. It is not logged or stored by the developer.

### 2. Settings
The extension stores your preferences locally using the browser's storage API:
- Chosen AI provider (Groq or Ollama)
- API key (for Groq)
- Selected model
- A "show floating button" preference

This information is kept in your browser and is only used to make the requested fact-check requests. It is never sent to the developer.

### 3. Usage statistics
The extension stores a local count of how many checks you've run and the date of your last check, shown in the popup. This data stays on your device.

## Where your data goes

The selected text is sent only to the provider you choose:

- **Groq** (if selected): text is sent to `https://api.groq.com`. Groq's handling of that data is governed by Groq's own privacy policy: https://groq.com/privacy-policy/
- **Ollama** (if selected): text is sent to a local server you run (default `http://localhost:11434`). In this mode, nothing leaves your computer.

No other servers or third parties receive your data.

## Data retention

- Settings and usage stats remain in your browser until you clear them or uninstall the extension.
- The most recent result may be cached locally in your browser for display. The developer retains nothing.

## What we do NOT do

- We do not sell or transfer your data to third parties for unrelated purposes.
- We do not use your data for advertising, creditworthiness, or lending.
- We do not run third-party analytics or tracking.

## Your choices

- Use the **Ollama (local)** provider for fully offline operation where no data leaves your machine.
- Remove your API key at any time from the extension's options page.
- Uninstall the extension to remove all locally stored data.

## Children's privacy

NoMoreLie is not directed at children under 13 and does not knowingly collect data from them.

## Changes to this policy

This policy may be updated from time to time. Material changes will be reflected by updating the "Last updated" date above.

## Contact

For questions about this policy, contact: **REPLACE_WITH_YOUR_EMAIL@example.com**
