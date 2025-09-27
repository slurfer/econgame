"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ApiPrices } from "@/types/api/response/prices";

interface ShopDataContextType {
  items: ApiPrices["items"];
  shops: string[];
  refresh: () => void;
}

const ShopDataContext = createContext<ShopDataContextType | undefined>(
  undefined
);

export const ShopDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<ApiPrices["items"]>([]);
  const [shops, setShops] = useState<string[]>([]);

  async function loadData() {
    const res = await fetch("/api/prices");
    if (!res.ok) return;
    const data: ApiPrices = (await res.json()).data;
    setItems(data.items);
    setShops(data.shops);
  }

  useEffect(() => {
    loadData();

    function msUntilNextInterval() {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ms = now.getMilliseconds();
      const next = 5 - (minutes % 5);
      return next * 60_000 - seconds * 1000 - ms;
    }

    const firstTimeout = setTimeout(() => {
      loadData();
      const interval = setInterval(loadData, 5 * 60_000);
      (window as any).pricesInterval = interval;
    }, msUntilNextInterval());

    return () => {
      clearTimeout(firstTimeout);
      clearInterval((window as any).pricesInterval);
    };
  }, []);

  return (
    <ShopDataContext.Provider value={{ items, shops, refresh: loadData }}>
      {children}
    </ShopDataContext.Provider>
  );
};

export const useShopData = () => {
  const context = useContext(ShopDataContext);
  if (!context)
    throw new Error("useShopData must be used within ShopDataProvider");
  return context;
};
