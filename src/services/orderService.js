import { API_BASE_URL, api } from "../config/api";

export const addOrder = async (orderRequest) => {
    try {
        const response = await api.post("/order/checkout", orderRequest)
        return response.data;
    } catch (error) {
        console.error("Error in addOrder:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllOrder = async () => {
    try {
        const response = await api.get("/order/all")
        return response.data;
    } catch (error) {
        console.error("Error in getAllOrder:", error.response?.data || error.message);
        throw error;
    }
}

export const getYourOrder = async () => {
    try {
        const response = await api.get("/order")
        return response.data;
    } catch (error) {
        console.error("Error in getYourOrder:", error.response?.data || error.message);
        throw error;
    }
}

export const confirmOrder = async (id) => {
    try {
        const response = await api.get("/order/change", {params: {id}})
        return response.data;
    } catch (error) {
        console.error("Error in confirmOrder:", error.response?.data || error.message);
        throw error;
    }
}

export const cancelOrder = async (id) => {
    try {
        const response = await api.get("/order/cancel", {params: {id}})
        return response.data;
    } catch (error) {
        console.error("Error in cancelOrder:", error.response?.data || error.message);
        throw error;
    }
}