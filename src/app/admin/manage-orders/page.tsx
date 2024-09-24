// main page
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProducts";
import Container from "@/components/Container";
import NullData from "@/components/NullData";
import { ManageOrdersTable } from "./ManageOrders";
import getOrders from "@/app/actions/getOrders";



const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Access denied!" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersTable orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
