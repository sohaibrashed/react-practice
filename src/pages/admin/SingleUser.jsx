import { useGetUserQuery } from "@/services/usersApi";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { UserCheck2 } from "lucide-react";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function SingleUser({ id }) {
  const { data, isLoading, isError } = useGetUserQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  const { user } = data;

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500">
          Failed to load user data. Please try again later.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-500">User not found.</p>
      </div>
    );
  }

  return (
    <DrawerContent className="bg-gray-300">
      <div className="flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck2 />
            <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
          </div>
          <div className="space-y-4 overflow-y-auto">
            {/* <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">User ID:</span>
              <span className="text-gray-800 font-semibold">{user._id}</span>
            </div> */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Full Name:</span>
              <span className="text-gray-800 font-semibold">{user.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800 font-semibold">{user.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Role:</span>
              <span className="text-gray-800 font-semibold">{user.role}</span>
            </div>
          </div>
        </div>
      </div>
    </DrawerContent>
  );
}
