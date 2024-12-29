import React from "react";

export default function Footer() {
  const goToTop = () => {
    console.log("Scroll to top function called");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside className="items-center">

        {/* 回到上面按鈕 */}
        {/* <label
          onClick={goToTop}
          className="btn btn-ghost btn-circle hover:cursor-pointer"
        >
          <svg
            fill="#000000"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 330 330"
            xml:space="preserve"
            className="fill-current w-6 h-6"
          >
            <path
              id="XMLID_224_"
              d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
            />
          </svg>
        </label> */}
        <p>
          Copyright © {new Date().getFullYear()} Montainner™- All right reserved
        </p>
      </aside>
    </footer>
  );
}
