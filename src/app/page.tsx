export const revalidate = 0;
import Container from "@/components/Container";
import Jumbotron from "@/components/Jumbotron";
import NullData from "@/components/NullData";
import ProductCard from "@/components/products/ProductCard";
import getProducts, { IProductParams } from "./actions/getProducts";
import Categories from "@/components/Categories";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffleProduct = shuffleArray(products);

  return (
    <main className="p-8">
      <Container>
        <div>
          <Jumbotron />
        </div>
        <div>
          <Categories />
        </div>
        {products.length === 0 ? (
          <NullData title="No products found." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {shuffleProduct.map((product: any) => {
              return <ProductCard data={product} />;
            })}
          </div>
        )}
      </Container>
    </main>
  );
}
