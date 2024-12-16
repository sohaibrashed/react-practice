import { useState } from "react";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import ProductFormDialog from "@/components/admin/ProductFormDialog";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/services/productsApi";
import Paginate from "@/components/Paginate";
import { useSearchParams } from "react-router";
import ReusableDataTable from "@/components/admin/ReusableDataTable";
import { productTableConfig } from "@/utils/tableConfig";
import ProductDetails from "@/components/ProductDetails";
import InventoryLayout from "@/components/admin/InventoryLayout";
import Logger from "@/utils/logger";
import SearchBar from "@/components/SearchBar";
import { useErrorHandler } from "@/hooks/UseErrorHandler";

export default function AdminProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const filters = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isError } = useGetProductsQuery(filters);
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

  const handlePageChange = (page) => {
    Logger.debug(`Changing to page: ${page}`);
    setSearchParams({ page });
  };

  const handleProductDelete = async (id) => {
    if (deleteLoading) return;

    try {
      await deleteProduct(id).unwrap();
      Logger.success("Product deleted successfully");
      clearError();
    } catch (err) {
      handleError("Failed to delete product", err);
    }
  };

  const handleProductUpdate = async (updatedData, id) => {
    if (updateLoading) return;

    try {
      await updateProduct({ data: updatedData, id }).unwrap();
      Logger.success("Product updated successfully");
      setDialogOpen(false);
      clearError();
    } catch (err) {
      handleError("Failed to update product", err);
    }
  };

  const handleProductCreation = async (data) => {
    if (createLoading) return;

    try {
      await createProduct(data).unwrap();
      Logger.success("Product created successfully");
      setDialogOpen(false);
      clearError();
    } catch (err) {
      handleError("Failed to create product", err);
    }
  };

  const handleDialogChange = (isOpen) => {
    if (!createLoading) {
      setDialogOpen(isOpen);
    }
  };

  return (
    <InventoryLayout
      title="Products"
      isDialogOpen={isDialogOpen}
      handleDialogChange={handleDialogChange}
      handleAddClick={() => !createLoading && setDialogOpen(true)}
      isLoading={isLoading || createLoading || updateLoading || deleteLoading}
      DialogComponent={
        <ProductFormDialog
          onSubmit={handleProductCreation}
          isLoading={createLoading}
          isEdit={false}
        />
      }
      SearchComponent={<SearchBar />}
      TableComponent={
        <ReusableDataTable
          data={data?.products}
          columns={productTableConfig}
          onView={(id) => console.log("Viewing", id)}
          onEdit={(product, id) => handleProductUpdate(product, id)}
          onDelete={(id) => handleProductDelete(id)}
          ViewComponent={ProductDetails}
          EditFormComponent={ProductFormDialog}
          caption="A list of registered products."
        />
      }
      PaginationComponent={
        <Paginate
          currentPage={data?.pagination?.currentPage}
          totalPages={data?.pagination?.totalPages}
          onPageChange={(page) => handlePageChange(page)}
        />
      }
    />
  );
}
