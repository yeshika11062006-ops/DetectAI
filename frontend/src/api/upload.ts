import api from "./api";

export async function uploadEvidence(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/upload",
    formData
  );

  return response.data;
}