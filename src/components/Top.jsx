import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SwitchButton from "../components/SwitchButton";
import UserButton from "../components/UserButton";
import LogoutButton from "../components/LogoutButton";
import CartButton from "../components/CartButton";
import FolderButton from "./FolderButton";

export default function Top({ isLoggedIn, role, updateAuthState, cart, removeFromCart, clearCart}) {

  const ROLE_HIERARCHY = {
    "ROLE_GUEST": 1,
    "ROLE_MEMBER": 2,
    "ROLE_ADMIN": 3
  }
    
  window.addEventListener('click', function(e) {
      document.querySelectorAll('.dropdownDetails').forEach(function(dropdownDetails) {
        if (!dropdownDetails.contains(e.target)) {
          // Click was outside the dropdown, close it 
          dropdownDetails.open = false;
        }
      });
  });
    
    
  return (
    <div className="flex flex-col justify-center items-center bg-base-200">
      <div className="navbar bg-base-200 xs:w-full max-w-screen-xl z-30 relative">
        {/* 左側 */}
        <div className="navbar-start">
          {/* 手機板 下拉式 */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm md:btn-md btn-ghost btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="relative top-10 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {/* HOME */}
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* ABOUT */}
              <li>
                <Link to="/about">About</Link>
              </li>
              {/* Features */}
              <li>
                <a>Features</a>
                <ul className="p-2">
                  <li>
                    <Link to="/equipment">借裝備</Link>
                  </li>
                  {/* <li>
                    <Link to="/itinerary">隊伍資訊</Link>
                  </li> */}
                </ul>
              </li>

              {/* Creates */}
              {
                isLoggedIn && ROLE_HIERARCHY[role] >= ROLE_HIERARCHY["ROLE_ADMIN"] ? 
                <li className="text-success">
                  <a>Creates</a>
                  <ul className="p-2">
                    <li className="underline">
                      <Link to="/create/equipment">新增裝備</Link>
                    </li>
                    {/* <li>
                      <Link to="/create/itinerary">新增隊伍</Link>
                    </li> */}
                  </ul>
                </li> :
                <></>
              }
              {/* Order */}
              {
                isLoggedIn && ROLE_HIERARCHY[role] >= ROLE_HIERARCHY["ROLE_ADMIN"] ? 
                <li className="text-success">
                  <a>Creates</a>
                  <ul className="p-2">
                    <li className="underline">
                      <Link to="/order/equipment">裝備訂單</Link>
                    </li>
                    {/* <li>
                      <Link to="/create/itinerary">新增隊伍</Link>
                    </li> */}
                  </ul>
                </li> :
                <></>
              }
              {/* Admin */}
              {
                isLoggedIn && ROLE_HIERARCHY[role] >= ROLE_HIERARCHY["ROLE_ADMIN"] ? 
                <li className="text-success">
                  <Link to="/admin">Admin</Link>
                </li> :
                <></>
              }
            </ul>
          </div>
          {/* 標題 */}
          {}
          <Link to="/" className="hidden sm:block sm:text-4xl font-tradewinds md:pl-4">Mountaineer</Link>
        </div>

        {/* 中間 */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* HOME */}
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* ABOUT */}
            <li>
              <Link to="/about">About</Link>
            </li>
            {/* Features */}
            <li>
              <details className="dropdownDetails ">
                  <summary>Features</summary>
                  <ul className="relative top-6 w-32">
                    <li>
                      <Link to="/equipment">借裝備</Link>
                    </li>
                    {/* <li>
                      <Link to="/itinerary">隊伍資訊</Link>
                    </li> */}
                  </ul>
              </details>
            </li>
            {/* Create */}
            {
              isLoggedIn && ROLE_HIERARCHY[role] >= ROLE_HIERARCHY["ROLE_MEMBER"] ? 
              <li className="text-success">
                <details className="dropdownDetails ">
                  <summary>Create</summary>
                  <ul className="relative top-6 w-32">
                    <li>
                      <Link to="/create/equipment">新增裝備</Link>
                    </li>
                    {/* <li>
                      <Link to="/create/itinerary">新增隊伍</Link>
                    </li> */}
                  </ul>
                </details>
              </li> :
              <></>
            }
            {/* Order */}
            {
              isLoggedIn && ROLE_HIERARCHY[role] >= ROLE_HIERARCHY["ROLE_MEMBER"] ? 
              <li className="text-success">
                <details className="dropdownDetails ">
                  <summary>Order</summary>
                  <ul className="relative top-6 w-32">
                    <li>
                      <Link to="/order/equipment">裝備訂單</Link>
                    </li>
                    {/* <li>
                      <Link to="/order/itinerary">你的隊伍</Link>
                    </li> */}
                  </ul>
                </details>
              </li> :
              <></>
            }
            {/* Admin */}
            {
              isLoggedIn && ROLE_HIERARCHY[role] >= ROLE_HIERARCHY["ROLE_ADMIN"] ? 
              <li className="text-success">
                <Link to="/admin">Admin</Link>
              </li> :
              <></>
            }
          </ul>
        </div>

        {/* 右邊 */}
        <div className="navbar-end">
          <ul className="flex flex-row items-center justify-center">
            {
              isLoggedIn ? 
              <>
                <li>
                  <Link to="/profile">
                    <UserButton />
                  </Link>
                </li>
                <li>
                  <Link to="/order">
                    <FolderButton />
                  </Link>
                </li>
                <li>
                  <CartButton cart={cart} removeFromCart={removeFromCart} clearCart={clearCart}/>
                </li>
                <li>
                  <Link to="/">
                    <LogoutButton updateAuthState={updateAuthState}/>
                  </Link>
                </li> 
                <li>
                  <SwitchButton />
                </li>
              </> :
              <>
                <li>
                  <Link to="/login">
                    <UserButton />
                  </Link>
                </li>
                <li>
                  <CartButton cart={cart} removeFromCart={removeFromCart} clearCart={clearCart}/>
                </li>
                <li>
                  <SwitchButton />
                </li>
              </>
            }
            
          </ul>
        </div>
      </div>
    </div>
  );
};