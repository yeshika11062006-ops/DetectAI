import api from "./api";

export async function analyzeEvidence(text: string) {
  const response = await api.post("/ai/analyze", {
    text,
  });

  return response.data.analysis;
}