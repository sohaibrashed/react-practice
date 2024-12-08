import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "@/components/AddToCart";
import { useCreateOrderMutation } from "@/services/ordersApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { saveAddress } from "@/services/addressSlice";
import { resetCart } from "@/services/cartSlice";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const { address } = useSelector((state) => state.address);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [name, setName] = useState(address?.name || "");
  const [addressLine, setAddressLine] = useState(address?.addressLine || "");
  const [postal, setPostal] = useState(address?.postal || "");
  const [city, setCity] = useState(address?.city || "");
  const [country, setCountry] = useState(address?.country || "");
  const [phone, setPhone] = useState(address?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState(
    address?.paymentMethod || ""
  );
  const [orderId, setOrderId] = useState("");

  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (isSuccess && orderId) {
      dispatch(
        saveAddress({ name, addressLine, postal, city, country, phone })
      );
      dispatch(resetCart());
      navigate(`/ordersummary/${orderId}`);
    }
  }, [isSuccess, orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if ((!name, !addressLine, !postal, !city, !country, !phone, !paymentMethod))
      return;
    try {
      const response = await createOrder({
        items: cartItems,
        shippingAddress: {
          fullName: name,
          address: addressLine,
          postalCode: postal,
          city,
          country,
          phone,
        },
        paymentMethod,
      });
      setOrderId(response?.data?.data?._id);
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) {
    toast({
      variant: "destructive",
      title: "An error occurred during placing order.",
    });
  }

  return (
    <div className="container mx-auto p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18v18H3z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500">
                It looks like you haven't added anything to your cart yet.
              </p>
              <Link to={"/"}>
                <Button className="mt-4">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.images?.[0] ||
                          "https://via.placeholder.com/100x100"
                        }
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                            {item.name || "Product Name"}
                          </h3>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>

                        <p className="text-sm text-gray-500">
                          {item.quantity} x {item.price}
                        </p>
                        <AddToCart item={item} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-xl font-bold text-green-500">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
            </>
          )}
        </Card>
      </div>

      {cartItems.length > 0 && (
        <form onSubmit={handleSubmit}>
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="w-full"
                disabled={isLoading}
                required
              />
              <Input
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                type="text"
                placeholder="Address"
                className="w-full"
                disabled={isLoading}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                  disabled={isLoading}
                  required
                />
                <Input
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  type="text"
                  placeholder="Postal Code"
                  disabled={isLoading}
                  required
                />
              </div>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                placeholder="Country"
                className="w-full"
                disabled={isLoading}
                required
              />
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="Phone"
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <Select
                required
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value)}
                className="w-full"
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash on Delivery">
                    Cash on Delivery
                  </SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="solid"
              className="mt-6 bg-pink-600 hover:bg-pink-700 text-white w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <LoadingSpinner />}
              <ShoppingCart size={20} className="mr-2" /> Place Order
            </Button>
          </Card>
        </form>
      )}
    </div>
  );
}
