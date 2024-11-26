import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function SignUpForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 py-3">
        Create an Account
      </h2>
      <Input type="text" placeholder="Full Name" className="w-full" required />
      <Input type="email" placeholder="Email" className="w-full" required />
      <Input
        type="password"
        placeholder="Password"
        className="w-full"
        required
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        className="w-full"
        required
      />
      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
        Sign Up
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
