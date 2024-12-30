import React from 'react'
import { API_BASE_URL, api } from "../config/api";

export const getAllUser = async () => {
    try {
        const response = await api.get('/auth/all');
        console.log("獲取所有使用者資料");

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const upgradeUser = async (id) => {
    try {
        const response = await api.get('/auth/upgrade', { params: {id} })
        return response.data;
    } catch (error) {
        console.error("Error in upgradeUser:", error.response?.data || error.message);
        throw error;
    }
}


