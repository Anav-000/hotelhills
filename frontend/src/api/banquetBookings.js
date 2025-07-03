import { apiRequest } from "./index";

export const getBanquetBookings = () => apiRequest("/banquet-bookings");
export const getBanquetBooking = (id) => apiRequest(`/banquet-bookings/${id}`);
export const createBanquetBooking = (data) =>
  apiRequest("/banquet-bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateBanquetBooking = (id, data) =>
  apiRequest(`/banquet-bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteBanquetBooking = (id) =>
  apiRequest(`/banquet-bookings/${id}`, { method: "DELETE" });
