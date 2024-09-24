// main page
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProducts";
import Container from "@/components/Container";
import NullData from "@/components/NullData";
import getOrders from "@/app/actions/getOrders";
import getOrdersByUserId from "../actions/getOrdersByUserId";
import { OrderClient } from "./OrderClient";



const Orders = async () => {
 
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Access denied!" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if(!orders) {
    return <NullData title="No orders yet..."/>
  }
  return (
    <div className="pt-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
