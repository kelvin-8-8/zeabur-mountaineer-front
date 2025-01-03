import React, { useState } from "react";

export default function UserButton() {
  return (
    <label className="btn btn-sm sm:btn-md btn-ghost btn-circle">
      
      {/* profile icon */}
      <svg
        className="w-6 h-6 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </label>
  );
}
