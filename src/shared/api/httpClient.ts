import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:9000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: Add request/response interceptors for auth token injection and global error handling later.
