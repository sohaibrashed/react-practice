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
import Paginate from "@/components/Paginate";
import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";

export default function AdminProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filters = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isError } = useGetProductsQuery(filters);
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
  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

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

  console.log(data);

  return (
    <div className="min-h-screen">
      {isError && "Something went wrong"}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Products</h1>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button
              className="bg-green-500 sm:w-40 ml-1 hover:bg-green-600"
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
      <div className="relative w-full mb-2 flex items-center">
        <Input
          type="text"
          // value={searchQuery}
          // onChange={handleSearchChange}
          placeholder="Search..."
          className="rounded-lg shadow-sm py-6"
        />
        <Search className="absolute right-3 text-gray-400" size={20} />
      </div>

      <ProductTable
        products={data?.products}
        onUpdateProduct={handleProductUpdate}
        handleDeleteProduct={handleProductDelete}
        isLoading={updateLoading || deleteLoading || false}
      />

      <div className="mt-4">
        <Paginate
          currentPage={data?.pagination?.currentPage}
          totalPages={data?.pagination?.totalPages}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  );
}
