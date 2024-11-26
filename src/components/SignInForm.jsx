import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function SignInForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 py-3">
        Welcome Back
      </h2>
      <Input type="email" placeholder="Email" className="w-full" required />
      <Input
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
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        Sign In
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
