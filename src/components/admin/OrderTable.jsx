import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import OrderFormDialog from "./OrderFormDialog"; // Update UserFormDialog to OrderFormDialog
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useNavigate } from "react-router";

export default function OrderTable({
  orders,
  onUpdateOrder,
  handleDeleteOrder,
  isLoading = false,
}) {
  const navigate = useNavigate();

  const handleFormSubmit = (updatedData, id) => {
    if (onUpdateOrder) {
      onUpdateOrder(updatedData, id);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Table>
        <TableCaption className="text-gray-500">
          A list of registered orders.
        </TableCaption>
        <TableHeader>
          <TableRow className={"bg-slate-100 rounded-lg"}>
            <TableHead className="text-left">Order ID</TableHead>
            <TableHead className="text-left">Customer Name</TableHead>
            <TableHead className="text-left">Total Amount</TableHead>
            <TableHead className="text-left">Payment Status</TableHead>
            <TableHead className="text-left">Order Status</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id} className="hover:bg-gray-100">
              <TableCell className="py-2 px-4 border-b">{order._id}</TableCell>
              <TableCell className="py-2 px-4 border-b">
                {order.shippingAddress.fullName}
              </TableCell>
              <TableCell className="py-2 px-4 border-b">
                ${order.totalAmount.toFixed(2)}
              </TableCell>
              <TableCell className="py-2 px-4 border-b">
                {order.paymentStatus}
              </TableCell>
              <TableCell
                className={`py-2 px-4 border-b capitalize ${
                  order.orderStatus === "Processing" ? "text-orange-600" : ""
                } ${order.orderStatus === "Completed" ? "text-green-600" : ""}`}
              >
                {order.orderStatus}
              </TableCell>
              <TableCell className="py-2 px-4 border-b">
                {order.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="py-2 px-4 border-b">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      disabled={isLoading}
                      variant="outline"
                      className="text-sm"
                    >
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <Button variant="ghost" className="font-normal w-full">
                        View
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="font-normal w-full"
                          >
                            Update
                          </Button>
                        </DialogTrigger>
                        <OrderFormDialog
                          isEdit
                          order={order}
                          onSubmit={handleFormSubmit}
                          isLoading={isLoading}
                        />
                      </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <Button variant="ghost" className="font-normal w-full">
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}