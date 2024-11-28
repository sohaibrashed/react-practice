import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useSignupMutation } from "@/services/usersApi";
import LoadingSpinner from "./ui/loadingSpinner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/services/authSlice";

export default function SignUpForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signup, { isLoading, isError }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoading) return;
      if (
        !email ||
        !name ||
        !password ||
        !confirmPassword ||
        password !== confirmPassword
      ) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "Please fill all the fields and make sure passwords match.",
        });
        return;
      }

      const res = await signup({ name, email, password }).unwrap();
      const {
        token,
        data: { name, email: userEmail, role },
      } = res;
      dispatch(setCredentials({ token, name, userEmail, role }));
      navigate("/");
    } catch (err) {
      // console.log(err);

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 py-3">
        Create an Account
      </h2>
      <Input
        disabled={isLoading}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        className="w-full"
        required
      />
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
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full"
        required
      />
      <Input
        disabled={isLoading}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="w-full"
        required
      />
      <Button
        disabled={isLoading}
        onClick={handleSubmit}
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
