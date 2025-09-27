"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ApiPrices } from "@/types/api/response/prices";
import { getMsUntilNextRefresh } from "@/util/timeTools";
import { refreshInterval } from "@/config/config.json";

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
    if (data.timestamp + refreshInterval < Date.now()) {
      loadData();
      return;
    }
    setItems(data.items);
    setShops(data.shops);
  }

  useEffect(() => {
    loadData();

    const firstTimeout = setTimeout(() => {
      loadData();
      const interval = setInterval(loadData, refreshInterval);
      (window as any).pricesInterval = interval;
    }, getMsUntilNextRefresh());

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
