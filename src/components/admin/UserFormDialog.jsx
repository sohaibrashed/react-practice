import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LoadingSpinner from "../ui/loadingSpinner";

export default function UserFormDialog({
  onSubmit,
  user = {},
  isEdit = false,
  isLoading = false,
}) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.role || "");

  const handleSubmit = () => {
    if (isLoading) return;

    if (isEdit) {
      if (!name || !email || !role) return;
      onSubmit({ name, email, role }, user._id);
    } else {
      if (!name || !email || !role || !password) return;

      onSubmit({ name, email, password, role });
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Update User" : "Create User"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update the details of the existing user."
            : "Fill in the details to create a new user."}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            required={!isEdit}
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            required={!isEdit}
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {!isEdit && (
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              required={!isEdit}
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        )}

        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            required={!isEdit}
            disabled={isLoading}
            value={role}
            onValueChange={(value) => setRole(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              {/* <SelectItem value="owner">Owner</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full"
          >
            {isLoading ? <LoadingSpinner /> : isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
