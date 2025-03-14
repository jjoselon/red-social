import axios from "axios";

const AUTH_URL = process.env.AUTH_URL || 'http://localhost:3001';
const AUTH_USERS = process.env.AUTH_USERS || 'http://localhost:3002';
const AUTH_POSTS = process.env.AUTH_POSTS || 'http://localhost:3003';

export const apiAuth = axios.create({
  baseURL: AUTH_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiUsers = axios.create({
  baseURL: AUTH_USERS,
  headers: { "Content-Type": "application/json" },
});


export const apiPosts = axios.create({
  baseURL: AUTH_POSTS,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para agregar el token automáticamente
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiPosts.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiPosts.defaults.headers.common["Authorization"];
  }
};
