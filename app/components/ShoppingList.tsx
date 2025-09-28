"use client";

import React from "react";

export default function ShoppingList({
  name,
  type,
}: {
  name: string;
  type: "add" | "remove";
}) {
  return (
    <div className="rounded-xl m-2 overflow-hidden flex flex-col justify-start items-center w-45 lg:w-63 h-30 lg:h-35 shadow-lg hover:shadow-2xl cursor-pointer bg-white">
      <div
        className="text-2xl font-semibold p-3 text-black mb-1 text-left w-full"
        style={{ backgroundColor: type === "add" ? "green" : "red" }}
      >
        {name}
      </div>
    </div>
  );
}
