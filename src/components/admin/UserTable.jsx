import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserTable({ users }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Table>
        <TableCaption className="text-gray-500">
          A list of registered users in the system.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Role</TableHead>
            <TableHead className="text-left">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} className="hover:bg-gray-100">
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell
                className={`capitalize ${
                  user.role === "admin" && "text-blue-600"
                } ${user.role === "owner" && "text-green-600"}`}
              >
                {user.role}
              </TableCell>
              <TableCell>{user.createdAt.split("T")[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
