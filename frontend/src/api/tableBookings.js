import { apiRequest } from "./index";

export const getTableBookings = () => apiRequest("/table-bookings");
export const getTableBooking = (id) => apiRequest(`/table-bookings/${id}`);
export const createTableBooking = (data) =>
  apiRequest("/table-bookings", { method: "POST", body: JSON.stringify(data) });
export const updateTableBooking = (id, data) =>
  apiRequest(`/table-bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteTableBooking = (id) =>
  apiRequest(`/table-bookings/${id}`, { method: "DELETE" });
