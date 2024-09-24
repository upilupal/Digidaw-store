// main page
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProducts";
import Container from "@/components/Container";
import NullData from "@/components/NullData";
import { ManageProductsTable } from "./ManageProductsTable";


const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Access denied!" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageProductsTable products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
