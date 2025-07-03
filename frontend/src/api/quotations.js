import { apiRequest } from "./index";

export const getQuotations = () => apiRequest("/quotations");
export const getQuotation = (id) => apiRequest(`/quotations/${id}`);
export const createQuotation = (data) =>
  apiRequest("/quotations", { method: "POST", body: JSON.stringify(data) });
export const updateQuotation = (id, data) =>
  apiRequest(`/quotations/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteQuotation = (id) =>
  apiRequest(`/quotations/${id}`, { method: "DELETE" });
