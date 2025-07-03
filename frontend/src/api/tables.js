import { apiRequest } from "./index";

export const getTables = () => apiRequest("/tables");
export const getTable = (id) => apiRequest(`/tables/${id}`);
export const createTable = (data) =>
  apiRequest("/tables", { method: "POST", body: JSON.stringify(data) });
export const updateTable = (id, data) =>
  apiRequest(`/tables/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteTable = (id) =>
  apiRequest(`/tables/${id}`, { method: "DELETE" });
