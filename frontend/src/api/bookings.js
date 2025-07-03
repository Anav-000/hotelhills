import { apiRequest } from "./index";

export const getBookings = () => apiRequest("/bookings");
export const getBooking = (id) => apiRequest(`/bookings/${id}`);
export const createBooking = (data) =>
  apiRequest("/bookings", { method: "POST", body: JSON.stringify(data) });
export const updateBooking = (id, data) =>
  apiRequest(`/bookings/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteBooking = (id) =>
  apiRequest(`/bookings/${id}`, { method: "DELETE" });
