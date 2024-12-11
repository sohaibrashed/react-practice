import { useParams } from "react-router";
import TrendingProducts from "@/components/TrendingProducts";
import ProductDetails from "@/components/ProductDetails";

export default function Product() {
  const { id } = useParams();

  return (
    <>
      <ProductDetails id={id} />
      <TrendingProducts />
    </>
  );
}
