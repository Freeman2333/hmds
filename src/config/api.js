import axios from "axios";
import { envConfig } from "./env-config";

export const api = axios.create({
  baseURL: envConfig.apiUrl,
});

api.interceptors.request.use((config) => {
  config.params.access_key = envConfig.apiKey;

  return config;
}, (error) => {
  return Promise.reject(error);
})