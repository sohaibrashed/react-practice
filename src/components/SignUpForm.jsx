import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useSignupMutation } from "@/services/usersApi";
import LoadingSpinner from "./ui/loadingSpinner";
import { setCredentials } from "@/services/authSlice";
import useFormValidation from "@/hooks/useFormValidation";
import { signupSchema } from "@/validationSchemas/signup";
import FormError from "./FormError";

export default function SignUpForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation(signupSchema, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signup, { isLoading, isError }] = useSignupMutation();

  const onSubmit = async (formData) => {
    try {
      if (isLoading) return;

      const { name: userName, email, password } = formData;

      const res = await signup({ name: userName, email, password }).unwrap();
      const {
        token,
        data: { name, email: userEmail, role },
      } = res;

      dispatch(setCredentials({ token, name, userEmail, role }));

      navigate("/");
    } catch (err) {
      const { data: error } = err;

      if (isError) {
        if (error?.message) {
          if (error.message.includes("password")) {
            toast({
              variant: "destructive",
              title: "Password must be at least 6 characters long.",
            });
          } else if (error.message.includes("email")) {
            toast({
              variant: "destructive",
              title: "Please provide a valid email address.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "An error occurred during signup.",
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "An error occurred during signup.",
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 py-3">
        Create an Account
      </h2>
      <div>
        <Input
          disabled={isLoading}
          type="text"
          placeholder="Full Name"
          className="w-full"
          required
          {...register("name")}
        />
        {errors?.name && <FormError message={errors?.name?.message} />}
      </div>
      <div>
        <Input
          disabled={isLoading}
          type="email"
          placeholder="Email"
          className="w-full"
          required
          {...register("email")}
        />
        {errors?.email && <FormError message={errors?.email?.message} />}
      </div>
      <div>
        <Input
          disabled={isLoading}
          type="password"
          placeholder="Password"
          className="w-full"
          required
          {...register("password")}
        />
        {errors?.password && <FormError message={errors?.password?.message} />}
      </div>
      <div>
        <Input
          disabled={isLoading}
          type="password"
          placeholder="Confirm Password"
          className="w-full"
          required
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && (
          <FormError message={errors?.confirmPassword?.message} />
        )}
      </div>
      <Button
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {isLoading ? <LoadingSpinner /> : "Sign Up"}
      </Button>
      <p className="text-sm text-gray-500 text-center">
        Already have an account?{" "}
        <Link to={"/account/signin"} className="text-blue-600 hover:underline ">
          Sign in
        </Link>
      </p>
    </form>
  );
}
