"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/components/common/Spinner/Spinner";
import Style from "./LandingStyle.module.scss";


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const handleClick = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      document.documentElement.style.setProperty(
        "--window-height",
        `${window.innerHeight}px`
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

   if (isLoading) return <Spinner />;

  return (
    <div
      className={Style["landing-page"]}
      style={{ height: viewportHeight + "px" }}
    >
      <h1 className={Style["landing-title"]}> سو </h1>
      <ul className={Style["landing-navbar"]}>
        <li className="mb-1">
          <Link href="/menu-with-out-cart">
            <button onClick={handleClick}>Menu</button>
          </Link>
        </li>
        <li className="mb-1">
          <Link href="/contact-us">
            <button onClick={handleClick}>Contact US</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
