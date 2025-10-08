"use client";

import React from "react";

export default function Item({
  name,
  price,
  normalPrice,
  bgColor,
  titleColor = "black",
}: {
  name: string;
  price: number;
  normalPrice: number;
  bgColor: string;
  titleColor?: string;
}) {
  const showNormalPrice = price !== normalPrice;
  return (
    <div className="rounded-xl m-2 overflow-hidden flex flex-col justify-start items-center w-45 lg:w-63 h-30 lg:h-35 shadow-lg hover:shadow-2xl cursor-pointer bg-white">
      <div
        className="text-2xl font-semibold p-3 mb-1 text-left w-full"
        style={{ backgroundColor: bgColor, color: titleColor }}
      >
        {name}
      </div>
      <div
        className={`text-3xl p-3 font-bold ${
          showNormalPrice ? "text-red-600 flex" : "black"
        } items-stretch text-left w-full`}
      >
        {price} Kč
        {showNormalPrice && (
          <span className="text-xs text-black ml-2 line-through">
            {normalPrice} Kč
          </span>
        )}
      </div>
    </div>
  );
}
