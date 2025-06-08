const API_URL = import.meta.env.VITE_API_URL + "/api/asistentes";

export async function login(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return await res.json();
}

document.cookie = ""; // borra manualmente

export async function getProfile() {
  const res = await fetch(`${API_URL}/profile`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) throw await res.json();
  return await res.json();
}


export async function register(data) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return await res.json();
}


