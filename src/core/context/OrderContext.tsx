"use client";

import { createContext, useContext, useState } from "react";

const OrderContext = createContext({});

type Props = {
  children: any;
};

export const OrderContextProvider = ({ children }: Props) => {
  const [orders, setOrders] = useState<any>([]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
