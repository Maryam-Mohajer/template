"use client";

import React, { useEffect, useState } from "react";
import Style from "./Style.module.scss";
import menuIcone from "../../../assets/images/hot drink big.png";
import Image from "next/image";
import MenuGroupItem from "./MenuGroupItem/MenuGroupItem";
import { useOrderContext } from "@/core/context/OrderContext";
import { getAccessToken } from "@/core/services/authentication/authentication.service";

type IProps = {
  data: any;
  hasSoppingCart?: boolean;
};
const MenuGroup = ({ data, hasSoppingCart = false }: IProps) => {
  const { orders }: any = useOrderContext();
  const [categoryIconeUrl, setCategoryIconeUrl] = useState<any>(menuIcone);

  const serveCategoryIcon = async (filePath: string) => {
    const MainUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = getAccessToken();
    try {
      const result = await fetch(
        MainUrl + `/MenuCategory/ServeImage?fullFileName=${filePath}`,
        {
          headers: {
            Authorization: token ? "Bearer " + token : "",
          },
        }
      );

      if (result.status === 200 || result.ok) {
        const arrayBuffer = await result?.arrayBuffer();
        const blob = new Blob([arrayBuffer]);
        const url = URL.createObjectURL(blob);
        setCategoryIconeUrl(url);
      } else {
        setCategoryIconeUrl(menuIcone);
      }
    } catch (error) {
      console.error("Error fetching category icon:", error);
      setCategoryIconeUrl(menuIcone);
    }
  };

  useEffect(() => {
    if (data?.iconFullFileName) serveCategoryIcon(data?.iconFullFileName);
  }, [data?.iconFullFileName]);

  return (
    <div className={`${Style["menu-group-container"]} mb-4`}>
      <Image
        src={categoryIconeUrl}
        alt=""
        className={Style["menu-group-icon"]}
        width={50}
        height={50}
      />
      <h4 className={`${Style["menu-group-title"]} mb-3`}>
        {data.menuCategoryTitle}
      </h4>
      {data.items &&
        data.items.length > 0 &&
        data.items.map((item: any, index: number) => {
          let initialCount: number = 0;
          let itemObj = item;
          orders.length > 0 &&
            orders.find((row: any) => {
              if (item.id == row.id) {
                initialCount = row.count;
                if (row.inventory) itemObj.inventory = row.inventory;
              }
            });

          return (
            <MenuGroupItem
              key={index}
              data={itemObj}
              hasSoppingCart={hasSoppingCart}
              initialCount={initialCount}
            />
          );
        })}
    </div>
  );
};

export default MenuGroup;
