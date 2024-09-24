import React from "react";
import Summary from "./Summary";
import getProducts from "../actions/getProducts";
import getOrders from "../actions/getOrders";
import getUsers from "../actions/getUsers";
import Container from "@/components/Container";
import getGraphData from "../actions/getGraphData";
import Charts from "./Charts";

const page = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="max-w-[1150px] mx-auto my-6">
          <Charts data={graphData}/>
        </div>
      </Container>
    </div>
  );
};

export default page;
