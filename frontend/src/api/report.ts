import api from "./api";

export async function downloadReport(analysis: any) {

  const response = await api.post(
    "/report/download",
    analysis,
    {
      responseType: "blob",
    }
  );

  return response.data;
}