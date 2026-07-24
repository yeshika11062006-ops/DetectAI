import axios from "axios";

const API = "http://localhost:8000";

export async function chatWithEvidence(
  evidence: string,
  question: string
) {
  const response = await axios.post(`${API}/chat`, {
    evidence,
    question,
  });

  return response.data;
}