import React, { useState, useEffect } from "react";
import { isLogin, checkRole } from "../services/authService";
import { Outlet } from "react-router-dom";
import Top from "../components/Top";
import Footer from "../components/Footer";
import Loading from "./Loading";


export default function Layout({ isLoggedIn, role, updateAuthState, cart , removeFromCart }) {

    
    return (
        <div>
            {/* 將 isLoggedIn 和 role 當作 props 傳遞給 Top 元件 */}
            <Top isLoggedIn={isLoggedIn} role={role} updateAuthState={updateAuthState} cart={cart} removeFromCart={removeFromCart} />
            <main>
                <Outlet /> {/* 渲染對應的子路由內容 */}
            </main>
            <Footer />
        </div>
    );
}
