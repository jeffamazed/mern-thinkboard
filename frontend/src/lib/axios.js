import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api" // same origin when Node serves React
    : "http://localhost:3000/api"; // local dev

const api = axios.create({ baseURL });

export default api;
