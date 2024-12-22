import { useGetProductsQuery } from "@/services/productsApi";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./ui/loadingSpinner";
import { useNavigate } from "react-router";

export default function ProductCardGrid() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };

  console.log(data);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-900 font-semibold mb-6 relative after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-pink-600 after:rounded-full">
        Latest Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={handleProduct}
          />
        ))}

        {isError && "Something went wrong"}
      </div>
    </div>
  );
}
