import React from "react";
import { scrollToTop } from "../../helpers/scrollToTop";

const TopButton = () => {
  return (
    <div className="flecha flex justify-center mb-10">
      <button
        onClick={scrollToTop}
        className="bg-gray-700 text-white rounded-full p-4 animate-bounce hover:bg-gray-900 transition-shadow duration-200 shadow-md"
        aria-label="Volver arriba"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default TopButton;
