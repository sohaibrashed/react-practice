import { useNavigate, useParams } from "react-router";
import { useGetUserQuery } from "@/services/usersApi";
import LoadingSpinner from "@/components/ui/loadingSpinner";

export default function SingleUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUserQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  const { user } = data;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Failed to load user data. Please try again later.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 font-medium bg-gray-200 py-2 px-4 rounded-md"
          >
            &larr; Back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Details</h1>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">User ID:</span>
            <span className="text-gray-800 font-semibold">{user._id}</span>
          </div>
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
  );
}
