const API = "http://18.225.5.73:8000";

export async function streamAnalysis(
  text: string,
  onChunk: (chunk: string) => void
) {
  const response = await fetch(`${API}/ai/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    onChunk(chunk);
  }
}