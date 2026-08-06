import api from "./api";

export async function chatWithEvidence(
  evidence: string,
  question: string
) {
  const response = await api.post("/chat", {
    evidence,
    question,
  });

  return response.data;
}