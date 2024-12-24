import { useParams } from "react-router";
import TrendingProducts from "@/components/TrendingProducts";
import ProductDetails from "@/components/ProductDetails";
import Reviews from "@/components/Reviews";

export default function Product() {
  const { id } = useParams();

  return (
    <>
      <ProductDetails id={id} />
      <Reviews id={id} />
      <TrendingProducts />
    </>
  );
}
