export const FindItemInOrdersArray = (orders: any, data: any) => {
  return orders.find((item: any) => item.id === data.id);
};

export const PlusToOrders = (orders: any, data: any) => {
  const selectedItem = FindItemInOrdersArray(orders, data);
  if (selectedItem) {
    selectedItem.count++;
    return [...orders];
  }
};

export const MinesFromOrders = (orders: any, data: any) => {
  const selectedItem = FindItemInOrdersArray(orders, data);
  if (selectedItem) {
    selectedItem.count--;
    return [...orders];
  }
};

export const DeleteFromOrders = (orders: any, data: any) => {
  return orders.filter((item: any) => item.id !== data.id);
};

export const AppendNewItemToOrders = (count: number, data: any,setOrders : any ) => {
    let newOrder: any = {
        ...data,
        count: count,
      };
    return  setOrders((prev: any) => [...prev, newOrder]);
  };
