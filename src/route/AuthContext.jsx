// route/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { isLogin, checkRole } from "../services/authService";

// 創建 Context
export const AuthContext = createContext();

// 提供者組件
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: null,
        role: null,
    });

    useEffect(() => {
        const fetchAuthState = async () => {
            try {
                const loginResponse = await isLogin();
                const roleResponse = await checkRole();
                setAuthState({
                    isLoggedIn: loginResponse.data,
                    role: roleResponse.data.role,
                });
            } catch (error) {
                console.error("登入狀態檢查失敗", error);
                setAuthState({ isLoggedIn: false, role: null });
            }
        };

        fetchAuthState();
    }, []);

    const updateAuthState = (newState) => {
        setAuthState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    return (
        <AuthContext.Provider value={{ authState, updateAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};