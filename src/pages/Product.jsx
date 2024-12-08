import { useNavigate, useParams, useLocation, Link } from "react-router";
import { useGetProductQuery } from "@/services/productsApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import Rating from "react-rating";
import { Star } from "lucide-react";
import AddToCart from "@/components/AddToCart";
import TrendingProducts from "@/components/TrendingProducts";

export default function Product() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  const { product } = data;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Failed to load product data. Please try again later.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const isProductPage = location.pathname === `/product/${id}`;

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="container mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            &larr; Back
          </Button>

          <Card className="flex flex-col lg:flex-row gap-6 bg-white shadow-lg rounded-lg p-6">
            <div className="lg:w-1/2">
              <Carousel>
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="rounded-lg w-full h-[34rem] object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className={"bg-slate-600 text-white"} />
                <CarouselNext className={"bg-slate-600 text-white"} />
              </Carousel>
            </div>

            <div className="lg:w-1/2 space-y-4 p-10">
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>
              <p className="text-gray-600 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-4">
                <Badge>{product.category}</Badge>
                <Badge variant="secondary">{product.subCategory}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-800">
                  Price:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  $ {product.price.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Size:</span> {product.size}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Color:</span> {product.color}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Material:</span>{" "}
                  {product.material}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Stock:</span> {product.stock}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Brand:</span> {product.brand}
                </p>
                <div className="text-gray-600 flex items-center">
                  <span className="font-medium">Rating:</span>
                  <Rating
                    className="pt-1 pl-1"
                    emptySymbol={
                      <Star strokeWidth={0.5} size={16} fill="#fefbfb" />
                    }
                    fullSymbol={
                      <Star strokeWidth={0.5} size={16} fill="yellow" />
                    }
                    fractions={2}
                    initialRating={product.ratings}
                    readonly={true}
                  />
                  <span className="text-xs pl-2">{product.ratings}</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span className="text-gray-600">Tags:</span>
                <div className="flex gap-2 flex-wrap">
                  {product.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                </div>
              </div>

              {isProductPage && (
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Link to={"/checkout"}>Buy Now</Link>
                  </Button>
                  <AddToCart
                    size="lg"
                    className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white"
                    item={product}
                  >
                    Add to Cart
                  </AddToCart>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      <TrendingProducts />
    </>
  );
}
