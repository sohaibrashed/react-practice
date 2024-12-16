import { useState } from "react";
import UserFormDialog from "@/components/admin/UserFormDialog";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/services/usersApi";
import { useSearchParams } from "react-router";
import Paginate from "@/components/Paginate";
import ReusableDataTable from "@/components/admin/ReusableDataTable";
import SingleUser from "./SingleUser";
import { userTableConfig } from "@/utils/tableConfig";
import { useErrorHandler } from "@/hooks/UseErrorHandler";
import Logger from "@/utils/logger";
import SearchBar from "@/components/SearchBar";
import InventoryLayout from "@/components/admin/InventoryLayout";

export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const filters = Object.fromEntries(searchParams.entries());

  const { data: users, isLoading, isError } = useGetUsersQuery(filters);

  const [
    createUser,
    { isLoading: createLoading, error: createError, isSuccess: createSuccess },
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
    Logger.debug(`Changing to page: ${page}`);
    setSearchParams({ page });
  };

  const handleUserDelete = async (id) => {
    if (deleteLoading) return;

    try {
      await deleteUser(id).unwrap();
      Logger.success("User deleted successfully");
      clearError();
    } catch (err) {
      handleError("Failed to delete user", err);
    }
  };

  const handleUserUpdate = async (updatedData, id) => {
    if (updateLoading) return;

    try {
      await updateUser({ data: updatedData, id }).unwrap();
      Logger.success("User updated successfully");
      setDialogOpen(false);
      clearError();
    } catch (err) {
      handleError("Failed to update user", err);
    }
  };

  const handleUserCreation = async (data) => {
    if (createLoading) return;

    try {
      await createUser(data).unwrap();
      Logger.success("User created successfully");
      setDialogOpen(false);
      clearError();
    } catch (err) {
      handleError("Failed to create user", err);
    }
  };

  const handleDialogChange = (isOpen) => {
    if (!createLoading) {
      setDialogOpen(isOpen);
    }
  };

  return (
    <InventoryLayout
      title="Users"
      isDialogOpen={isDialogOpen}
      handleDialogChange={handleDialogChange}
      handleAddClick={() => !createLoading && setDialogOpen(true)}
      isLoading={isLoading || createLoading || updateLoading || deleteLoading}
      DialogComponent={
        <UserFormDialog
          onSubmit={handleUserCreation}
          isLoading={createLoading}
          isEdit={false}
        />
      }
      SearchComponent={<SearchBar />}
      TableComponent={
        <ReusableDataTable
          data={users?.data}
          columns={userTableConfig}
          onView={(id) => console.log("Viewing", id)}
          onEdit={(user, id) => handleUserUpdate(user, id)}
          onDelete={(id) => handleUserDelete(id)}
          ViewComponent={SingleUser}
          EditFormComponent={UserFormDialog}
          caption="A list of registered users."
          isLoading={
            isLoading || createLoading || updateLoading || deleteLoading
          }
        />
      }
      PaginationComponent={
        <Paginate
          currentPage={users?.pagination?.currentPage}
          totalPages={users?.pagination?.totalPages}
          onPageChange={(page) => handlePageChange(page)}
        />
      }
    />
  );
}
