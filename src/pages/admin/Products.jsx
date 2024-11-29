import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { CirclePlus, Search } from "lucide-react";
import ProdcutFormDialog from "@/components/admin/ProductFormDialog";
import ProductTable from "@/components/admin/ProductTable";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/services/productsApi";

export default function AdminProducts() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { data, isLoading, isError } = useGetProductsQuery();
  const [
    createProduct,
    {
      isLoading: createLoading,
      isError: createError,
      isSuccess: createSuccess,
      error,
    },
  ] = useCreateProductMutation();

  const [
    deleteProduct,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteProductMutation();

  const [
    updateProduct,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateProductMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  const handleProductDelete = async (id) => {
    try {
      if (deleteLoading) return;

      await deleteProduct(id);
      if (deleteError) throw Error;
      if (deleteSuccess) {
        toast({
          title: "Product deleted successfully.",
        });
      }
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        title: "An error occurred during deleting product.",
      });
    }
  };

  const handleProductUpdate = async (updatedData, id) => {
    try {
      if (updateLoading) return;

      await updateProduct({ data: updatedData, id });
      if (updateError) throw Error;
      if (updateSuccess) {
        toast({
          title: "Product updated successfully.",
        });
        setDialogOpen(false);
      }
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        title: "An error occurred during updating product.",
      });
    }
  };

  const handleProductCreation = async (data) => {
    try {
      if (createLoading) return;

      await createProduct(data);
      if (createError) throw Error;
      if (createSuccess) {
        toast({
          title: "Product created successfully.",
        });
        setDialogOpen(false);
      }
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        title: "An error occurred during creating product.",
      });
    }
  };

  const handleDialogChange = (isOpen) => {
    if (!createLoading) {
      setDialogOpen(isOpen);
    }
  };

  if (createError) {
    console.log(error);
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Product Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            // value={searchQuery}
            // onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button
              className="bg-green-500 w-40 hover:bg-green-600"
              onClick={() => !createLoading && setDialogOpen(true)}
              disabled={createLoading}
            >
              <CirclePlus />
              <span>Create</span>
            </Button>
          </DialogTrigger>
          <ProdcutFormDialog
            onSubmit={handleProductCreation}
            isLoading={createLoading}
          />
        </Dialog>
      </div>
      {isError && "Something went wrong"}

      <ProductTable
        products={data?.products}
        onUpdateProduct={handleProductUpdate}
        handleDeleteProduct={handleProductDelete}
        isLoading={updateLoading || deleteLoading || false}
      />
    </div>
  );
}
