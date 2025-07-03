import { apiRequest } from "./index";

export const generateBill = (bookingId, additionalCharges = 0) =>
  apiRequest("/bills/generate", {
    method: "POST",
    body: JSON.stringify({ bookingId, additionalCharges }),
  });

export const getBill = (id) => apiRequest(`/bills/${id}`);
