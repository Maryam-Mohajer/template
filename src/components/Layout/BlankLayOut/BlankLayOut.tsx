"use client";

import React, { useEffect, useState } from "react";
import Style from "./Style.module.scss";

type Props = {
  children: any;
};

const BlankLayOut = ({ children }: Props) => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={Style["blank-page-container"]}
      style={{ height: viewportHeight + "px" }}
    >
      {children}
    </div>
  );
};

export default BlankLayOut;
