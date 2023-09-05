import Layout from "@/components/Layout/Layout";
import  {Orders as OrdersContainer} from "@/components/Menu/Orders/Orders";
import React from "react";

const Orders = () => {
  return (
  <Layout hasSoppingCart={false} hasBack={true} title1= "orders" title2= "welcome">
    <OrdersContainer />
  </Layout>
  );
};

export default Orders;
