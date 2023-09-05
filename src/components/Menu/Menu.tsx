"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MenuGroup from "./MenuGroup/MenuGroup";
import Layout from "../Layout/Layout";
import { useGetAllForMenu } from "@/core/services/api/menu/menu.api";
import Style from "./Style.module.scss";
import "swiper/css";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  hasSoppingCart?: boolean;
  canWaiterOrder?: boolean;
  setOpenModal?: any;
}

const Menu = ({
  hasSoppingCart = false,
  canWaiterOrder = false,
  setOpenModal,
}: Props) => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [menuData, setMenuData] = useState<any>([]);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const [isManualScroll, setIsManualScroll] = useState(false);

  const { data, isLoading } = useGetAllForMenu();

  useEffect(() => {
    if (data) {
      const result = data.data?.result;
      setMenuData(result);
    }
  }, [data]);

  useEffect(() => {
    if (!isScrolling && swiperInstance) {
      swiperInstance.slideTo(activeNavItem);
    }
  }, [activeNavItem, isScrolling, swiperInstance]);

  const handleNavItemClick = (index: number) => {
    setActiveNavItem(index);
    scrollToItem(index);
  };

  const scrollToItem = (index: number) => {
    setIsScrolling(true);
    setIsManualScroll(true);
    const contentRef = contentRefs[index]?.current;
    if (contentRef) {
      contentRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (event: any) => {
    // alert(isManualScroll)

    // if (isManualScroll) {
    //   alert(1)
    //   setIsManualScroll(false);
    //   return;
    // }
    // alert(2)

    const scrollPos = event.target.scrollTop + 100;
    const activeIndex = contentRefs.findIndex(
      (ref: any, index: number) =>
        ref.current.offsetTop <= scrollPos &&
        (!contentRefs[index + 1] ||
          contentRefs[index + 1].current.offsetTop > scrollPos)
    );
    setActiveNavItem(activeIndex);
    setSwiperInstance((swiper: any) => {
      if (swiper) {
        swiper.slideTo(activeIndex);
      }
      return swiper;
    });
    setIsScrolling(false);
  };

  const contentRefs: React.RefObject<any>[] = menuData.map(() =>
    React.createRef()
  );

  const handleSwiperInit = (swiper: any) => {
    setSwiperInstance(swiper);
  };

  return (
    <Layout
      hasSoppingCart={hasSoppingCart}
      canWaiterOrder={canWaiterOrder}
      setOpenModal={setOpenModal}
      title1="menu"
      title2="welcome"
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            color: "#ab6149",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : menuData && menuData.length > 0 ? (
        <>
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            onInit={handleSwiperInit}
            className={Style["tab-swiper-container"]}
          >
            {menuData.map((item: any, index: number) => (
              <SwiperSlide
                key={index}
                onClick={() => handleNavItemClick(index)}
                className={`${Style["swiper-item"]} ${
                  activeNavItem === index ? Style["active"] : ""
                }`}
              >
                {item.menuCategoryTitle}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={Style["menu-content"]} onScroll={handleScroll}>
            {menuData.map((item: any, index: number) => (
              <div key={index} ref={contentRefs[index]}>
                <MenuGroup data={item} hasSoppingCart={hasSoppingCart} />
              </div>
            ))}
            <div style={{height : "600px"}}></div>
          </div>
        </>
      ) : (
        <>آیتمی موجود نیست</>
      )}
    </Layout>
  );
};

export default Menu;
