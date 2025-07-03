import { apiRequest } from "./index";

export const getKOTs = () => apiRequest("/kots");
export const getKOT = (id) => apiRequest(`/kots/${id}`);
export const createKOT = (data) =>
  apiRequest("/kots", { method: "POST", body: JSON.stringify(data) });
export const updateKOT = (id, data) =>
  apiRequest(`/kots/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteKOT = (id) =>
  apiRequest(`/kots/${id}`, { method: "DELETE" });
