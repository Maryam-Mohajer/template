"use client";

import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useRouter } from "next/navigation";
import { useGetAllTablesByWaiter } from "@/core/services/api/table/table.api";
import { CircularProgress, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Style from "./Style.module.scss";
import Spinner from "../common/Spinner/Spinner";
import Link from "next/link";

const ChooseTable = () => {
  const router = useRouter();
  const [tables, setTables] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data, isLoading: AllTablesLoading } = useGetAllTablesByWaiter();

  useEffect(() => {
    if (data) {
      const result = data.data.result;
      let pro: any[] = [];
      result &&
        result.length > 0 &&
        result.forEach((row: any) => {
          pro.push(row);
        });
      setTables(pro);
    }
  }, [data, AllTablesLoading]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    padding: theme.spacing(6),
    textAlign: "center",
    cursor: "pointer",
    border: "1px solid #ABA894",
    borderRadius: "15px",
    fontFamily: "Kohinoor",
    boxShadow: "1px 1px 10px #ABA894",
    transition: "background-color 0.3s, color 0.3s", // Add transition properties
    "&:hover": {
      backgroundColor: "#ABA894",
      color: "#ffffff",
      border: "0 none",
    },
  }));

  const handleClick = (data: string) => {
    setIsLoading(true);
    router.push(`/menu-with-cart/${data}`);
  };
  if (isLoading) return <Spinner />;

  return (
    <>
      <Layout
        hasSoppingCart={false}
        canWaiterOrder={false}
        title1="Tables"
        title2="welcome"
      >
        {AllTablesLoading ? (
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
        ) : tables.length > 0 ? (
          <div className={Style.tablesContainer}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              className="p-5"
            >
              {tables.map((row: any, index: number) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  onClick={() => handleClick(row.qrCode)}
                >
                  <Item>{row.title}</Item>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <>
            <Grid item xs={12} className={Style["empty-orders-text"]}>
              میزی یافت نشد
            </Grid>
            <Grid item xs={12} className={Style["empty-orders-text"]}>
              <Link
                className={Style["return-link"]}
                href={`/menu-with-out-cart`}
              >
                بازگشت
              </Link>
            </Grid>
          </>
        )}
      </Layout>
    </>
  );
};

export { ChooseTable };
