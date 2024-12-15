import MinimalistProductCard from "@/components/MinimalistProductCard";
import Paginate from "@/components/Paginate";
import ShopFilterSidebar from "@/components/ShopFilterSidebar";
import TrendingProducts from "@/components/TrendingProducts";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useGetProductsQuery } from "@/services/productsApi";
import { useSearchParams } from "react-router";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isError } = useGetProductsQuery(filters);

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-500">Error loading products</p>
      </div>
    );
  }

  const { products } = data;

  return (
    <>
      <div className="container mx-auto">
        <div className="relative w-full h-[300px] lg:h-[500px] flex items-center justify-center">
          <img
            src="/shop-cover-1.webp"
            alt="shop-cover"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
            <div className="text-left px-6 lg:px-16">
              <h1 className="text-white text-xl sm:text-3xl lg:text-5xl font-bold">
                Welcome to <span className="text-pink-600">Clothify</span>
              </h1>
              <p className="text-gray-100 text-sm sm:text-base lg:text-lg mt-2">
                Redefine your wardrobe with our latest collection of styles and
                trends.
              </p>
              <p className="text-gray-100 invisible sm:visible sm:text-base lg:text-lg mt-2">
                From casuals to formals, we’ve got you covered!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        <ShopFilterSidebar />
        <div className="flex-1 pl-0 lg:pl-6">
          {products.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map((product) => (
                <MinimalistProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="pb-4 border-b-2">
        <Paginate
          currentPage={data?.pagination?.currentPage}
          totalPages={data?.pagination?.totalPages}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
      <TrendingProducts />
    </>
  );
}
