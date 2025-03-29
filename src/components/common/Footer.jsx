import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 px-6 py-10 bg-[#f8f8f8] w-full mt-[60px]">
      <div className="flex items-center gap-3">
        <p className="text-[#383838] text-3xl sm:text-4xl font-bold">Reqres</p>
      </div>

      <ul className="flex flex-wrap gap-6 sm:gap-10 text-[#252525] text-base sm:text-lg font-medium justify-center text-center">
        <li className="cursor-pointer hover:text-[#ff4141] transition-colors">
          Company
        </li>
        <li className="cursor-pointer hover:text-[#ff4141] transition-colors">
          Products
        </li>
        <li className="cursor-pointer hover:text-[#ff4141] transition-colors">
          Offices
        </li>
        <li className="cursor-pointer hover:text-[#ff4141] transition-colors">
          About
        </li>
        <li className="cursor-pointer hover:text-[#ff4141] transition-colors">
          Contact
        </li>
      </ul>

      <div className="flex flex-col items-center gap-4 w-full text-[#1a1a1a] text-sm sm:text-base">
        <hr className="w-[90%] sm:w-[80%] border-0 rounded-md h-[2px] bg-[#c7c7c7]" />
        <p>Copyright © {new Date().getFullYear()} - All Rights Reserved</p>
      </div>
    </div>
  );
}
