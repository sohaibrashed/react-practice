import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useSigninMutation } from "@/services/usersApi";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/services/authSlice";
import LoadingSpinner from "./ui/loadingSpinner";

export default function SignInForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signin, { isLoading, isError }] = useSigninMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoading) return;
      if (!email || !password) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please fill all the fields.",
        });
        return;
      }

      const res = await signin({ email, password }).unwrap();
      const {
        token,
        data: { name, email: userEmail },
      } = res;
      dispatch(setCredentials({ token, name, userEmail }));
      navigate("/");
    } catch (err) {
      // console.log(err);

      const { data: error } = err;

      if (isError) {
        if (error?.message) {
          if (
            error.message.includes("password") ||
            error.message.includes("email")
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
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 py-3">
        Welcome Back
      </h2>
      <Input
        disabled={isLoading}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full"
        required
      />
      <Input
        disabled={isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full"
        required
      />
      <div className="text-right text-sm">
        <a href="#" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>
      <Button
        disabled={isLoading}
        onClick={handleSubmit}
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
