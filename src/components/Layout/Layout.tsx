"use client";

import React, { useEffect, useState } from "react";
import Style from "./Style.module.scss";
import Link from "next/link";
import Image from "next/image";
import orderIcon from "../../assets/images/header shopping cart.png";
import { useParams } from "next/navigation";
import { useOrderContext } from "@/core/context/OrderContext";
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useAuthenticationContext } from "@/core/context/AuthenticationContext";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../common/Spinner/Spinner";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getAccessToken } from "@/core/services/authentication/authentication.service";
import { usePathname } from "next/navigation";

type Props = {
  children: any;
  hasSoppingCart: boolean;
  canWaiterOrder?: boolean;
  hasBack?: boolean;
  setOpenModal?: any;
  title1?: string;
  title2?: string;
};

const Layout = ({
  children,
  hasSoppingCart = false,
  canWaiterOrder = false,
  hasBack = false,
  setOpenModal,
  title1,
  title2,
}: Props) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const { orders }: any = useOrderContext();
  const { logOut, userInfo }: any = useAuthenticationContext();
  const token = getAccessToken();

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const anchorRef: any = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleCartIconClicked = () => {
    setIsLoading(true);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

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

  if (isLoading) return <Spinner />;

  return (
    <>
      <div
        className={Style["menu-container"]}
        style={{ height: viewportHeight + "px" }}
      >
        <div className={Style["content-container"]}>
          <div className={Style["top-cart"]}>
            {hasSoppingCart && (
              <Link
                href={`/orders/${params?.string}`}
                onClick={handleCartIconClicked}
              >
                <Image
                  src={orderIcon}
                  alt="orders cart"
                  className={Style["order-cart"]}
                />
                <span className={Style["orders-total-count"]}>
                  {orders.length}
                </span>
              </Link>
            )}
            {token && (
              <div>
                <div
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  className={Style["button2"]}
                >
                  <MenuIcon className={Style["menuIcone"]} />
                </div>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            style={{
                              padding: "3px 5px",
                              width: "max-content",
                            }}
                          >
                            <MenuItem
                              className={`${Style["menuItem"]} ${Style["active"]}`}
                            >
                              {`${userInfo?.firstName} ${userInfo?.lastName}`}
                            </MenuItem>
                            {pathname !== "/choose-table" && (
                              <MenuItem
                                className={Style["menuItem"]}
                                onClick={() => {
                                  setIsLoading(true);
                                  router.push(`/choose-table`);
                                  handleClose;
                                }}
                              >
                                ثبت سفارش جدید
                              </MenuItem>
                            )}
                            <MenuItem
                              className={Style["menuItem"]}
                              onClick={() => {
                                logOut();
                                handleClose;
                              }}
                            >
                              خروج
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            )}
            {hasBack && orders.length > 0 && (
              <a className={Style["back"]} onClick={() => router.back()}>
                <KeyboardBackspaceIcon className={Style["menuIcone"]} />
              </a>
            )}
          </div>

          <div className={Style["menu-heading"]}>
            <h2>{title1}</h2>
            <p>{title2}</p>
          </div>
          <div className={Style["menu"]}>{children}</div>
          <div className={Style["menu-footer"]}>
            <div className={Style["footer-top"]}>
              ما را از حساسیت غذایی خود مطلع کنید
            </div>
            <div className={Style["footer-bottom"]}>
              ساعت کار کافه : 9:30 صبح - 12 شب
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Layout;
