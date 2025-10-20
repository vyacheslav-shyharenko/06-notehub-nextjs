import axios from "axios";

const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const URL = process.env.NEXT_PUBLIC_API_URL;

const config = {
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
};

export const apiClient = axios.create(config);
