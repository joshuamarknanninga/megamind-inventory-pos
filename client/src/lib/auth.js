import { api } from "./api";

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  const { token, employee } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(employee));
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return employee;
}

export async function signup(name, email, password) {
  const res = await api.post("/auth/signup", { name, email, password });
  const { token, employee } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(employee));
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return employee;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  delete api.defaults.headers.common["Authorization"];
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getToken() {
  return localStorage.getItem("token");
}

// Initialize auth header if token exists
const token = getToken();
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
