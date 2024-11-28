import UserTable from "@/components/admin/UserTable";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useGetUsersQuery } from "@/services/usersApi";

const users = [
  {
    _id: { $oid: "673c3b5850f67b19407193e4" },
    name: "Jean Waters",
    email: "jean.waters@gmail.com",
    password: "$2b$10$4NORj2Qj5Fsc/keKgnNXJOFEpgYo8QFw2Ty1/PJFdnBVI164anORu",
    role: "user",
    createdAt: { $date: "2024-11-19T07:16:40.162Z" },
    updatedAt: { $date: "2024-11-19T07:16:40.162Z" },
    __v: 0,
  },
  {
    _id: { $oid: "673c3b5850f67b19407193e5" },
    name: "Anna Johnson",
    email: "anna.johnson@gmail.com",
    password: "$2b$10$5NORj3Oj5Fsc/keKgnNXLOFEpgYo8QFw2Ty1/PLFdnBVI164anPRu",
    role: "admin",
    createdAt: { $date: "2024-11-18T07:16:40.162Z" },
    updatedAt: { $date: "2024-11-18T07:16:40.162Z" },
    __v: 0,
  },
];

export default function Users() {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserTable users={users.data} />
      {isError && "Something went wrong"}
    </div>
  );
}
