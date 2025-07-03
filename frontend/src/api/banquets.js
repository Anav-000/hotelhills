import { apiRequest } from "./index";

export const getBanquets = () => apiRequest("/banquets");
export const getBanquet = (id) => apiRequest(`/banquets/${id}`);
export const createBanquet = (data) =>
  apiRequest("/banquets", { method: "POST", body: JSON.stringify(data) });
export const updateBanquet = (id, data) =>
  apiRequest(`/banquets/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteBanquet = (id) =>
  apiRequest(`/banquets/${id}`, { method: "DELETE" });
