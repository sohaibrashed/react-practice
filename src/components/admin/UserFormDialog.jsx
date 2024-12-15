import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import useFormValidation from "@/hooks/useFormValidation";
import { userAddSchema, userUpdateSchema } from "@/validationSchemas/user";
import FormError from "../FormError";

export default function UserFormDialog({
  onSubmit,
  user = {},
  isEdit = false,
  isLoading = false,
}) {
  const userSchema = isEdit ? userUpdateSchema : userAddSchema;
  const userStates = isEdit
    ? { name: user.name || "", email: user.email || "", role: user.role || "" }
    : {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useFormValidation(userSchema, userStates);

  const onSubmitForm = (data) => {
    if (isLoading) return;

    if (isEdit) {
      onSubmit(
        { name: data.name, email: data.email, role: data.role },
        user._id
      );
    } else {
      onSubmit({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
      });
    }

    reset();
  };

  const selectedRole = watch("role");

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Update User" : "Add User"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update the details of the existing user."
            : "Fill in the details to add a new user."}
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="space-y-4 max-h-[70vh] overflow-y-auto px-2"
      >
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            required={!isEdit}
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter full name"
            disabled={isLoading}
            {...register("name")}
          />
          {errors.name && <FormError message={errors?.name?.message} />}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            required={!isEdit}
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            disabled={isLoading}
            {...register("email")}
          />
          {errors.email && <FormError message={errors?.email?.message} />}
        </div>

        {!isEdit && (
          <>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                required={!isEdit}
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <FormError message={errors?.password?.message} />
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                required={!isEdit}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter Confirm Password"
                disabled={isLoading}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FormError message={errors?.confirmPassword?.message} />
              )}
            </div>
          </>
        )}

        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            required={!isEdit}
            disabled={isLoading}
            onValueChange={(value) => setValue("role", value)}
            value={selectedRole}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <FormError message={errors?.role?.message} />}
        </div>

        <div className="mt-4">
          <Button disabled={isLoading} className="w-full">
            {isLoading ? <LoadingSpinner /> : isEdit ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
