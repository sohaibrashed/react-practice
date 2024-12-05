import { useState } from "react";
import OrderFormDialog from "@/components/admin/OrderFormDialog";
import OrderTable from "@/components/admin/OrderTable";
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
import { useGetOrdersQuery } from "@/services/ordersApi";

export default function Orders() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const [
    createUser,
    {
      isLoading: createLoading,
      isError: createError,
      isSuccess: createSuccess,
    },
  ] = useCreateUserMutation();

  const [
    deleteUser,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteUserMutation();

  const [
    updateUser,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateUserMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  console.log(orders);

  const handleOrderDelete = async (id) => {
    try {
      if (deleteLoading) return;

      await deleteUser(id);
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

  const handleOrderUpdate = async (updatedData, id) => {
    try {
      if (updateLoading) return;

      await updateUser({ data: updatedData, id });
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

  const handleOrderCreation = async (data) => {
    try {
      if (createLoading) return;

      await createUser(data);
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
      <h1 className="text-4xl font-bold mb-8">Order Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            // value={searchQuery}
            // onChange={handleSearchChange}
            placeholder="Search orders..."
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
        {/* <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
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
          <OrderFormDialog
            onSubmit={handleOrderCreation}
            isLoading={createLoading}
          />
        </Dialog> */}
      </div>
      <OrderTable
        orders={orders?.data}
        onUpdateOrder={handleOrderUpdate}
        handleDeleteOrder={handleOrderDelete}
        isLoading={updateLoading || deleteLoading || false}
      />
      {isError && "Something went wrong"}
    </div>
  );
}
