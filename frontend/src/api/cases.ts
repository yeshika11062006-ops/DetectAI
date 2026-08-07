import api from "./api";

export async function getCases() {
  const response = await api.get("/cases");
  return response.data;
}

export async function createCase(
  title: string,
  description: string
) {
  const response = await api.post("/cases", {
    title,
    description,
  });

  return response.data;
}

export async function deleteCase(id: number) {
  const response = await api.delete(`/cases/${id}`);
  return response.data;
}