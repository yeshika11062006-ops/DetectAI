import api from "./api";

// Register
export async function register(
  name: string,
  email: string,
  password: string
) {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
}

// Login
export async function login(
  email: string,
  password: string
) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}