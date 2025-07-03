import { apiRequest } from "./index";

export const getRooms = () => apiRequest("/rooms");
export const getRoom = (id) => apiRequest(`/rooms/${id}`);
export const createRoom = (data) =>
  apiRequest("/rooms", { method: "POST", body: JSON.stringify(data) });
export const updateRoom = (id, data) =>
  apiRequest(`/rooms/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteRoom = (id) =>
  apiRequest(`/rooms/${id}`, { method: "DELETE" });
