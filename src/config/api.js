import axios from "axios";

export const API_BASE_URL = "http://zeabur-mountaineer-back.zeabur.internal:8080";

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // 允許攜帶 cookie
    headers: {
        'Content-Type': 'application/json'
    }
});