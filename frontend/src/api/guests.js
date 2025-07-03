import { apiRequest } from "./index";

export const getGuests = () => apiRequest("/guests");
export const getGuest = (id) => apiRequest(`/guests/${id}`);
export const createGuest = (data) =>
  apiRequest("/guests", { method: "POST", body: JSON.stringify(data) });
export const updateGuest = (id, data) =>
  apiRequest(`/guests/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteGuest = (id) =>
  apiRequest(`/guests/${id}`, { method: "DELETE" });
