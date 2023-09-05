"use client";

import React, { useEffect, useState } from "react";
import Style from "../Style.module.scss";
import { useOrderContext } from "@/core/context/OrderContext";
import {
  AppendNewItemToOrders,
  DeleteFromOrders,
  MinesFromOrders,
  PlusToOrders,
} from "@/core/utils/order-items";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

type IProps = {
  data: any;
  hasSoppingCart?: boolean;
  initialCount?: number;
};
const MenuGroupItem = ({
  data,
  hasSoppingCart = false,
  initialCount = 0,
}: IProps) => {
  const { orders, setOrders }: any = useOrderContext();
  const [canChooseItem, setCanChooseItem] = useState<boolean>(
    initialCount > 0 ? true : false
  );
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    if (data.count) {
      setCount(data.count);
      setCanChooseItem(true);
    }
  }, [data]);

  const handleShoppingCartClicked = () => {
    setCanChooseItem(true);
    setCount(1);
    AppendNewItemToOrders(1, data, setOrders);
  };
  const handlePlusClicked = () => {
    if (data.inventory && count >= data.inventory) {
      return;
    }
    setCount((prev: number) => prev + 1);
    setOrders(PlusToOrders(orders, data));
  };
  const handleMinesClicked = () => {
    if (count > 1) {
      setCount((prev: number) => prev - 1);
      setOrders(MinesFromOrders(orders, data));
    } else {
      setCanChooseItem(false);
      setOrders(DeleteFromOrders(orders, data));
    }
  };

  const myStyle = data.inventory === 0 ? Style["menu-item-disable"] : "";

  return (
    <div className={`${Style["menu-item-container"]} ${myStyle} mb-3`}>
      <ul className={Style["menu-item-top"]}>
        <li className={Style["menu-item-title"]}>{data?.title}</li>
        <li className={Style["menu-item-price"]}>{data?.price}</li>
        <li className={Style["menu-item-title-en"]}>{data?.enTitle}</li>
      </ul>
      <ul className={Style["menu-item-bottom"]}>
        <li className={Style["menu-item-description"]}>{data?.description}</li>
        <li className={Style["menu-item-shopping-cart"]}>
          {!hasSoppingCart ? (
            <></>
          ) : !canChooseItem ? (
            <a className="cursor-pointer" onClick={handleShoppingCartClicked}>
              <FontAwesomeIcon icon={faCartPlus} className={Style["shopping-cart-icon"]} />
            </a>
          ) : (
            <div className={`${Style["choose-item-container"]}`}>
              <Fab className={`${Style.plus}`} onClick={handlePlusClicked}>
                <AddIcon className={`${Style.plusIcon}`} />
              </Fab>
              <span className={`${Style["item-count"]} mx-3`}>
                {count === 0 ? 1 : count}
              </span>
              <Fab className={`${Style.plus}`} onClick={handleMinesClicked}>
                <RemoveIcon className={`${Style.plusIcon}`} />
              </Fab>
            </div>
          )}
        </li>
      </ul>

      {data?.isError && (
        <span
          className={`${Style.errorText}`}
        >{`موجودی ${data.title} ${data.inventory} عدد می باشد.`}</span>
      )}
    </div>
  );
};

export default MenuGroupItem;
