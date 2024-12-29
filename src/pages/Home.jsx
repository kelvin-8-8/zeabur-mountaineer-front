import React from "react";
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";

export default function Home( isLoggedIn) {

  const navigate = useNavigate();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Carousel />
      {/* <div
        className="hero max-w-screen-xl h-80"
      >
        <div className="hero-overlay bg-opacity-0"></div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-10 text-5xl font-bold">Welcome !</h1>
            <button className="btn btn-primary" onClick={() => navigate("/login")}>Click me login</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
