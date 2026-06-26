export async function callGroq(messages, apiKey, model) {
  if (!apiKey) {
    throw new Error("Groq API key not configured. Go to extension options to set it up.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model || "llama-3.3-70b-versatile",
      messages,
      temperature: 0.1,
      max_tokens: 2048,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function callOllama(messages, baseUrl, model) {
  const url = `${baseUrl || "http://localhost:11434"}/api/chat`;

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model || "llama3",
        messages,
        stream: false,
        format: "json",
        options: { temperature: 0.1 }
      })
    });
  } catch (e) {
    throw new Error(`Cannot connect to Ollama at ${baseUrl || "http://localhost:11434"}. Is it running?`);
  }

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.message.content;
}
