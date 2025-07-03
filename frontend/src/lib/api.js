const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error: ${error.message}`, 0);
  }
}

// Room Management API
export const roomAPI = {
  getAll: () => apiRequest("/rooms"),
  getById: (id) => apiRequest(`/rooms/${id}`),
  create: (data) =>
    apiRequest("/rooms", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/rooms/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/rooms/${id}`, { method: "DELETE" }),
};

// Guest Management API
export const guestAPI = {
  getAll: () => apiRequest("/guests"),
  getById: (id) => apiRequest(`/guests/${id}`),
  create: (data) =>
    apiRequest("/guests", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/guests/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/guests/${id}`, { method: "DELETE" }),
};

// Booking Management API
export const bookingAPI = {
  getAll: () => apiRequest("/bookings"),
  getById: (id) => apiRequest(`/bookings/${id}`),
  create: (data) =>
    apiRequest("/bookings", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) => apiRequest(`/bookings/${id}`, { method: "DELETE" }),
};

// Table Management API
export const tableAPI = {
  getAll: () => apiRequest("/tables"),
  getById: (id) => apiRequest(`/tables/${id}`),
  create: (data) =>
    apiRequest("/tables", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/tables/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/tables/${id}`, { method: "DELETE" }),
};

// Table Booking API
export const tableBookingAPI = {
  getAll: () => apiRequest("/table-bookings"),
  getById: (id) => apiRequest(`/table-bookings/${id}`),
  create: (data) =>
    apiRequest("/table-bookings", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiRequest(`/table-bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) => apiRequest(`/table-bookings/${id}`, { method: "DELETE" }),
};

// KOT Management API
export const kotAPI = {
  getAll: () => apiRequest("/kots"),
  getById: (id) => apiRequest(`/kots/${id}`),
  create: (data) =>
    apiRequest("/kots", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/kots/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/kots/${id}`, { method: "DELETE" }),
};

// Menu Management API
export const menuAPI = {
  getAll: () => apiRequest("/menu"),
  getById: (id) => apiRequest(`/menu/${id}`),
  create: (data) =>
    apiRequest("/menu", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/menu/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/menu/${id}`, { method: "DELETE" }),
};

// Banquet Management API
export const banquetAPI = {
  getAll: () => apiRequest("/banquets"),
  getById: (id) => apiRequest(`/banquets/${id}`),
  create: (data) =>
    apiRequest("/banquets", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/banquets/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) => apiRequest(`/banquets/${id}`, { method: "DELETE" }),
};

// Banquet Booking API
export const banquetBookingAPI = {
  getAll: () => apiRequest("/banquet-bookings"),
  getById: (id) => apiRequest(`/banquet-bookings/${id}`),
  create: (data) =>
    apiRequest("/banquet-bookings", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiRequest(`/banquet-bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) => apiRequest(`/banquet-bookings/${id}`, { method: "DELETE" }),
};

// Quotation Management API
export const quotationAPI = {
  getAll: () => apiRequest("/quotations"),
  getById: (id) => apiRequest(`/quotations/${id}`),
  create: (data) =>
    apiRequest("/quotations", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/quotations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) => apiRequest(`/quotations/${id}`, { method: "DELETE" }),
};

// Bill Management API
export const billAPI = {
  getAll: () => apiRequest("/bills"),
  getById: (id) => apiRequest(`/bills/${id}`),
  create: (data) =>
    apiRequest("/bills", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiRequest(`/bills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/bills/${id}`, { method: "DELETE" }),
};

export { ApiError };
