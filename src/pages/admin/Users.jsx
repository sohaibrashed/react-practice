import { useState } from "react";
import UserFormDialog from "@/components/admin/UserFormDialog";
import UserTable from "@/components/admin/UserTable";
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
import { useSearchParams } from "react-router";
import Paginate from "@/components/Paginate";
import { Input } from "@/components/ui/input";

export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filters = Object.fromEntries(searchParams.entries());

  const { data: users, isLoading, isError } = useGetUsersQuery(filters);

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

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  const handleUserDelete = async (id) => {
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

  const handleUserUpdate = async (updatedData, id) => {
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

  const handleUserCreation = async (data) => {
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Users</h1>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button
              className="bg-green-500 sm:w-40 hover:bg-green-600 ml-1"
              onClick={() => !createLoading && setDialogOpen(true)}
              disabled={createLoading}
            >
              <CirclePlus />
              <span>Create</span>
            </Button>
          </DialogTrigger>
          <UserFormDialog
            onSubmit={handleUserCreation}
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
      <UserTable
        users={users?.data}
        onUpdateUser={handleUserUpdate}
        handleDeleteUser={handleUserDelete}
        isLoading={updateLoading || deleteLoading || false}
      />
      <div className="mt-4">
        <Paginate
          currentPage={users?.pagination?.currentPage}
          totalPages={users?.pagination?.totalPages}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
      {isError && "Something went wrong"}
    </div>
  );
}
