import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate, useParams } from "react-router";
import { useGetOrderQuery } from "@/services/ordersApi";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import {
  CheckCircle,
  CreditCard,
  MapPin,
  Package,
  ShoppingCart,
} from "lucide-react";

export default function OrderSummary() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOrderQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const order = data?.data;

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">Order not found</p>
        <Link to={"/"} className="mt-4">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  const {
    items,
    shippingAddress,
    paymentMethod,
    paymentStatus,
    orderStatus,
    totalAmount,
    createdAt,
  } = order;

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="container mx-auto p-6 lg:p-12 space-y-8">
      <Card className="p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Package size={28} className="text-pink-600" />
          <h2 className="text-xl sm:text-3xl font-bold">Order Summary</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <p>
              <span className="font-semibold">Order ID:</span> {id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="text-blue-500" />
            <p>
              <span className="font-semibold">Payment Status:</span>{" "}
              <Badge>{paymentStatus}</Badge>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-yellow-500" />
            <p>
              <span className="font-semibold">Payment Method:</span>{" "}
              <Badge>{paymentMethod}</Badge>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Package className="text-purple-500" />
            <p>
              <span className="font-semibold">Delivery Status:</span>{" "}
              <Badge>{orderStatus}</Badge>
            </p>
          </div>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Total Amount:</span> $
            {totalAmount.toFixed(2)}
          </p>
        </div>
      </Card>

      <Card className="p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <MapPin size={28} className="text-pink-600" />
          <h3 className="text-xl font-semibold">Shipping Address</h3>
        </div>
        <div className="space-y-2">
          <p className="text-gray-800">{shippingAddress.fullName}</p>
          <p className="text-gray-800">{shippingAddress.address}</p>
          <p className="text-gray-800">
            {`${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
          </p>
          <p className="text-gray-800">{shippingAddress.phone}</p>
        </div>
      </Card>

      <Card className="p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <ShoppingCart size={28} className="text-pink-600" />
          <h3 className="text-xl font-semibold">Items</h3>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-4 border rounded-lg p-4 flex-col sm:flex-row sm:items-center sm:gap-0"
              onClick={() => navigate(`/product/${item.product._id}`)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.product?.images[0] ||
                    "https://via.placeholder.com/100x100"
                  }
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="space-y-1">
                  <p className="text-lg font-semibold line-clamp-1">
                    {item.product?.name || "------"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item?.quantity} x ${item?.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold">${item?.total.toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <p className="text-lg font-semibold">Grand Total:</p>
            <p className="text-xl font-bold text-green-500">
              $ {grandTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <Link to={"/"}>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3">
            Back to Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
