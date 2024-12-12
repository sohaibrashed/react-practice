import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, Pencil, Trash, View } from "lucide-react";
import UserFormDialog from "./UserFormDialog";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Drawer } from "../ui/drawer";
import SingleUser from "@/pages/admin/SingleUser";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import AlertMessage from "../AlertMessage";

export default function UserTable({
  users,
  onUpdateUser,
  handleDeleteUser,
  isLoading = false,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleFormSubmit = (updatedData, id) => {
    if (onUpdateUser) {
      onUpdateUser(updatedData, id);
    }
  };

  const openDrawer = (id) => {
    setSelectedUserId(id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Table>
        <TableCaption className="text-gray-500">
          A list of registered users.
        </TableCaption>

        <TableHeader>
          <TableRow className={"bg-slate-100 rounded-lg"}>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">Role</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} className="hover:bg-gray-100">
              <TableCell className="py-2 px-4 border-b">{user.name}</TableCell>
              <TableCell className="py-2 px-4 border-b">{user.email}</TableCell>
              <TableCell
                className={`py-2 px-4 border-b capitalize ${
                  user.role === "admin" ? "text-blue-600" : ""
                } ${user.role === "owner" ? "text-green-600" : ""}`}
              >
                {user.role}
              </TableCell>
              <TableCell className="py-2 px-4 border-b">
                {user.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="py-2 px-4 border-b">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      disabled={isLoading}
                      variant="outline"
                      className="text-sm"
                    >
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="font-normal w-full flex items-center"
                        onClick={() => openDrawer(user._id)}
                      >
                        <View />
                        View
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="font-normal w-full"
                          >
                            <Pencil />
                            Update
                          </Button>
                        </DialogTrigger>
                        <UserFormDialog
                          isEdit
                          user={user}
                          onSubmit={handleFormSubmit}
                          isLoading={isLoading}
                        />
                      </Dialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="font-normal w-full hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertMessage
                          handleAction={() => handleDeleteUser(user._id)}
                        />
                      </AlertDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isDrawerOpen && (
        <Drawer onOpenChange={closeDrawer} open={isDrawerOpen}>
          <SingleUser id={selectedUserId} />
        </Drawer>
      )}
    </div>
  );
}
