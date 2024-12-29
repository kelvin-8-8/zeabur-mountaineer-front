import axios from "axios";

export const API_BASE_URL = "https://mountaineerback.zeabur.app";

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // 允許攜帶 cookie
    headers: {
        'Content-Type': 'application/json'
    }
});