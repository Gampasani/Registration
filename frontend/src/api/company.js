import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const registerCompany = (data, token) =>
  API.post("/company/register", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getCompanyProfile = (token) =>
  API.get("/company/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
