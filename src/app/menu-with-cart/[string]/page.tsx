'use client'

import Menu from "@/components/Menu/Menu";
import React from "react";

const MenuWithCart = () => {

  return (
    <>
      {
        <Menu hasSoppingCart={true}
        />
        }
    </>
  );
};

export default MenuWithCart;
