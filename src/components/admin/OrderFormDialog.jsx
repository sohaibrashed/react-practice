import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LoadingSpinner from "../ui/loadingSpinner";

export default function OrderFormDialog({
  onSubmit,
  order = {},
  isEdit = false,
  isLoading = false,
}) {
  const [totalAmount, setTotalAmount] = useState(order.totalAmount || 0);
  const [paymentMethod, setPaymentMethod] = useState(order.paymentMethod || "");
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus || "");
  const [orderStatus, setOrderStatus] = useState(order.orderStatus || "");
  const [fullName, setFullName] = useState(
    order.shippingAddress?.fullName || ""
  );
  const [address, setAddress] = useState(order.shippingAddress?.address || "");
  const [city, setCity] = useState(order.shippingAddress?.city || "");
  const [country, setCountry] = useState(order.shippingAddress?.country || "");
  const [postalCode, setPostalCode] = useState(
    order.shippingAddress?.postalCode || ""
  );
  const [phone, setPhone] = useState(order.shippingAddress?.phone || "");

  const handleSubmit = () => {
    if (isLoading) return;

    if (
      !totalAmount ||
      !paymentMethod ||
      !paymentStatus ||
      !orderStatus ||
      !fullName ||
      !address ||
      !city ||
      !country ||
      !postalCode ||
      !phone
    ) {
      return;
    }

    const updatedOrder = {
      totalAmount,
      paymentMethod,
      paymentStatus,
      orderStatus,
      shippingAddress: {
        fullName,
        address,
        city,
        country,
        postalCode,
        phone,
      },
    };

    if (isEdit) {
      onSubmit(updatedOrder, order._id);
    } else {
      onSubmit(updatedOrder);
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Update Order" : "Create Order"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update the details of the existing order."
            : "Fill in the details to create a new order."}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto px-2">
        <div>
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input
            required
            id="totalAmount"
            name="totalAmount"
            type="number"
            placeholder="Enter total amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select
            required
            disabled={isLoading}
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="PayPal">PayPal</SelectItem>
              <SelectItem value="Debit Card">Debit Card</SelectItem>
              <SelectItem value="Cash on Delivery">Cash on Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="paymentStatus">Payment Status</Label>
          <Select
            required
            disabled={isLoading}
            value={paymentStatus}
            onValueChange={(value) => setPaymentStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="orderStatus">Order Status</Label>
          <Select
            required
            disabled={isLoading}
            value={orderStatus}
            onValueChange={(value) => setOrderStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select order status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Returned">Returned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="fullName">Customer Name</Label>
          <Input
            required
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter customer name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            required
            id="address"
            name="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input
            required
            id="city"
            name="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            required
            id="country"
            name="country"
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            required
            id="postalCode"
            name="postalCode"
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            required
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="mt-4">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full"
          >
            {isLoading ? <LoadingSpinner /> : isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
