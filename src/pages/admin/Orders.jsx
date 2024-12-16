import { useState } from "react";
import OrderFormDialog from "@/components/admin/OrderFormDialog";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/services/ordersApi";
import Paginate from "@/components/Paginate";
import { useSearchParams } from "react-router";
import { orderTableConfig } from "@/utils/tableConfig";
import OrderDetails from "@/components/OrderDetails";
import ReusableDataTable from "@/components/admin/ReusableDataTable";
import InventoryLayout from "@/components/admin/InventoryLayout";
import SearchBar from "@/components/SearchBar";
import { useErrorHandler } from "@/hooks/UseErrorHandler";
import Logger from "@/utils/logger";

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const filters = Object.fromEntries(searchParams.entries());
  const { data: orders, isLoading, isError } = useGetOrdersQuery(filters);
  const [
    createOrder,
    {
      isLoading: createLoading,
      isError: createError,
      isSuccess: createSuccess,
    },
  ] = useCreateOrderMutation();

  const [
    deleteOrder,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteOrderMutation();

  const [
    updateOrder,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateOrderMutation();

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

  const handleOrderDelete = async (id) => {
    if (deleteLoading) return;

    try {
      await deleteOrder(id).unwrap();
      Logger.success("Order deleted successfully");
      clearError();
    } catch (err) {
      handleError("Failed to delete order", err);
    }
  };

  const handleOrderUpdate = async (updatedData, id) => {
    if (updateLoading) return;

    try {
      await updateOrder({ data: updatedData, id }).unwrap();
      Logger.success("order updated successfully");
      setDialogOpen(false);
      clearError();
    } catch (err) {
      handleError("Failed to update order", err);
    }
  };

  const handleOrderCreation = async (data) => {
    if (createLoading) return;

    try {
      await createOrder(data).unwrap();
      Logger.success("Order created successfully");
      setDialogOpen(false);
      clearError();
    } catch (err) {
      handleError("Failed to create order", err);
    }
  };

  const handleDialogChange = (isOpen) => {
    if (!createLoading) {
      setDialogOpen(isOpen);
    }
  };

  return (
    <InventoryLayout
      title="Orders"
      isDialogOpen={isDialogOpen}
      handleDialogChange={handleDialogChange}
      handleAddClick={() => !createLoading && setDialogOpen(true)}
      isLoading={isLoading || createLoading || updateLoading || deleteLoading}
      DialogComponent={
        <OrderFormDialog
          onSubmit={handleOrderCreation}
          isLoading={createLoading}
          isEdit={false}
        />
      }
      SearchComponent={<SearchBar />}
      TableComponent={
        <ReusableDataTable
          data={orders?.data}
          columns={orderTableConfig}
          onView={(id) => console.log("Viewing", id)}
          onEdit={(order, id) => handleOrderUpdate(order, id)}
          onDelete={(id) => handleOrderDelete(id)}
          ViewComponent={OrderDetails}
          EditFormComponent={OrderFormDialog}
          caption="A list of registered orders."
        />
      }
      PaginationComponent={
        <Paginate
          currentPage={orders?.pagination?.currentPage}
          totalPages={orders?.pagination?.totalPages}
          onPageChange={(page) => handlePageChange(page)}
        />
      }
    />
  );
}

// return (
//   <div className="min-h-screen">
//     <div className="flex justify-between items-center mb-4">
//       <h1 className="text-4xl font-bold">Orders</h1>
//       {/* <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
//         <DialogTrigger asChild>
//           <Button
//             className="bg-green-500 w-40 hover:bg-green-600"
//             onClick={() => !createLoading && setDialogOpen(true)}
//             disabled={createLoading}
//           >
//             <CirclePlus />
//             <span>Add</span>
//           </Button>
//         </DialogTrigger>
//         <OrderFormDialog
//           onSubmit={handleOrderCreation}
//           isLoading={createLoading}
//         />
//       </Dialog> */}
//     </div>
//     <div className="relative w-full mb-2 flex items-center">
//       <Input
//         type="text"
//         // value={searchQuery}
//         // onChange={handleSearchChange}
//         placeholder="Search..."
//         className="rounded-lg shadow-sm py-6"
//       />
//       <Search className="absolute right-3 text-gray-400" size={20} />
//     </div>
//     {/* <OrderTable
//       orders={orders?.data}
//       onUpdateOrder={handleOrderUpdate}
//       handleDeleteOrder={handleOrderDelete}
//       isLoading={updateLoading || deleteLoading || false}
//     /> */}

//     <ReusableDataTable
// data={orders?.data}
// columns={orderTableConfig}
// onView={(id) => console.log("Viewing", id)}
// onEdit={(order, id) => handleOrderUpdate(order, id)}
// onDelete={(id) => handleOrderDelete(id)}
// ViewComponent={OrderDetails}
// EditFormComponent={DynamicForm}
// formConfig={orderFormConfig}
// caption="A list of registered orders."
//     />
//     <div className="mt-4">
// <Paginate
//   currentPage={orders?.pagination?.currentPage}
//   totalPages={orders?.pagination?.totalPages}
//   onPageChange={(page) => handlePageChange(page)}
// />
//     </div>
//     {isError && "Something went wrong"}
//   </div>
// );
