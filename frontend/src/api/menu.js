import { apiRequest } from "./index";

export const getMenuItems = () => apiRequest("/menu");
export const getMenuItem = (id) => apiRequest(`/menu/${id}`);
export const createMenuItem = (data) =>
  apiRequest("/menu", { method: "POST", body: JSON.stringify(data) });
export const updateMenuItem = (id, data) =>
  apiRequest(`/menu/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteMenuItem = (id) =>
  apiRequest(`/menu/${id}`, { method: "DELETE" });
