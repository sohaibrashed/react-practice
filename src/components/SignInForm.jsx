import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useSigninMutation } from "@/services/usersApi";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/services/authSlice";
import useFormValidation from "@/hooks/useFormValidation";
import { signinSchema } from "@/validationSchemas/signin";
import LoadingSpinner from "./ui/loadingSpinner";
import FormError from "./FormError";

export default function SignInForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation(signinSchema, {
    email: "sohaib@gmail.com",
    password: "password",
  });

  const [signin, { isLoading, isError }] = useSigninMutation();

  const onSubmit = async (data) => {
    try {
      if (isLoading) return;

      const res = await signin(data).unwrap();
      const {
        token,
        data: { name, email: userEmail, role },
      } = res;

      dispatch(setCredentials({ token, name, userEmail, role }));
      navigate("/");
    } catch (err) {
      const { data: error } = err;

      if (isError) {
        if (
          error?.message?.includes("password") ||
          error?.message?.includes("email")
        ) {
          toast({
            variant: "destructive",
            title: "Invalid email or password",
          });
        } else {
          toast({
            variant: "destructive",
            title: "An error occurred during signin.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "An error occurred during signin.",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 py-3">
        Welcome Back
      </h2>

      <div>
        <Input
          disabled={isLoading}
          type="email"
          placeholder="Email"
          className="w-full"
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
          {...register("password")}
        />
        {errors?.password && <FormError message={errors?.password?.message} />}
      </div>

      <div className="text-right text-sm">
        <a href="#" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>

      <Button
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? <LoadingSpinner /> : "Sign In"}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        Don't have an account?{" "}
        <Link to={"/account/signup"} className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
