import getProductById from "@/app/actions/getProductById";
import Container from "@/components/Container";
import NullData from "@/components/NullData";
import ProductDetails from "./ProductDetails";

interface IParams {
  productId: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);

  if (!product) {
    return <NullData title="product with given id does not exist" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4"></div>
      </Container>
    </div>
  );
};

export default Product;
