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
import { EllipsisVertical, Pencil, Trash, View } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ProdcutFormDialog from "./ProductFormDialog";
import { useState } from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import ProductDetails from "../ProductDetails";

export default function ProductTable({
  products,
  onUpdateProduct,
  handleDeleteProduct,
  isLoading = false,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleFormSubmit = (updatedData, id) => {
    if (onUpdateProduct) {
      onUpdateProduct(updatedData, id);
    }
  };

  const openDrawer = (id) => {
    setSelectedProductId(id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProductId(null);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <Table>
          <TableCaption className="text-gray-500">
            A list of registered products.
          </TableCaption>
          <TableHeader>
            <TableRow className={"bg-slate-100 rounded-lg"}>
              {/* <TableHead className="text-left">ID</TableHead> */}
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Description</TableHead>
              <TableHead className="text-left">Brand</TableHead>

              <TableHead className="text-left">Category</TableHead>
              <TableHead className="text-left">SubCategory</TableHead>
              {/* <TableHead className="text-left">Size</TableHead>
            <TableHead className="text-left">Color</TableHead>
            <TableHead className="text-left">Material</TableHead> */}
              <TableHead className="text-left">Stock</TableHead>
              <TableHead className="text-left">Price</TableHead>

              <TableHead className="text-left">CreatedAt</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} className="hover:bg-gray-100">
                {/* <TableCell className="py-2 px-4 border-b">
                {product._id}
              </TableCell> */}
                <TableCell className="py-2 px-4 border-b">
                  {product.name}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {product?.description.slice(0, 24)}...
                </TableCell>
                <TableCell className="py-2 px-4 border-b ">
                  {product.brand}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {product.category?.name}
                </TableCell>
                <TableCell className="py-2 px-4 border-b">
                  {product.subCategory?.name}
                </TableCell>
                {/* <TableCell className="py-2 px-4 border-b">
                {product.size}
              </TableCell>
              <TableCell className="py-2 px-4 border-b">
                {product.color}
              </TableCell>
              <TableCell className="py-2 px-4 border-b">
                {product.material}
              </TableCell> */}
                <TableCell className="py-2 px-4 border-b text-blue-600 font-semibold">
                  {product.stock}
                </TableCell>
                <TableCell className="py-2 px-4 border-b text-green-600 font-semibold">
                  ${product.price}
                </TableCell>
                <TableCell className="py-2 px-4 border-b text-orange-600 font-semibold">
                  {product.createdAt.split("T")[0]}
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
                      <DropdownMenuItem onClick={() => openDrawer(product._id)}>
                        <Button variant="ghost" className="font-normal w-full">
                          <View />
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
                              <Pencil />
                              Update
                            </Button>
                          </DialogTrigger>
                          <ProdcutFormDialog
                            isEdit
                            product={product}
                            onSubmit={handleFormSubmit}
                            isLoading={isLoading}
                          />
                        </Dialog>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <Button variant="ghost" className="font-normal w-full">
                          <Trash />
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
      {isDrawerOpen && (
        <Drawer
          onOpenChange={(isOpen) => {
            if (!isOpen) closeDrawer();
          }}
          open={isDrawerOpen}
        >
          <DrawerContent className="bg-gray-300 max-h-[95vh] rounded-lg">
            <ProductDetails id={selectedProductId} />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
