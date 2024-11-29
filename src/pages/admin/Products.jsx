import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/usersApi";
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
          title: "User deleted successfully.",
        });
      }
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        title: "An error occurred during deleting user.",
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
          title: "User updated successfully.",
        });
        setDialogOpen(false);
      }
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        title: "An error occurred during updating user.",
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
          title: "User created successfully.",
        });
        setDialogOpen(false);
      }
    } catch (error) {
      // console.log(error);
      toast({
        variant: "destructive",
        title: "An error occurred during creating user.",
      });
    }
  };

  const handleDialogChange = (isOpen) => {
    if (!createLoading) {
      setDialogOpen(isOpen);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-4">Product Management</h1>
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
      </div>
      <ProductTable
        products={data?.products}
        onUpdateProduct={handleProductUpdate}
        handleDeleteProduct={handleProductDelete}
        isLoading={updateLoading || deleteLoading || false}
      />
      {isError && "Something went wrong"}
    </div>
  );
}
