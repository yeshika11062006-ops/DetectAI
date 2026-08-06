import axios from "axios";

const API = "http://18.225.5.73:8000";

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