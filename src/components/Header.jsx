import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, ShoppingCart, User, Search, LogOutIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSignoutMutation } from "@/services/usersApi";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/services/authSlice";
import Navbar from "./NavBar";

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signout, { isLoading, isError }] = useSignoutMutation();

  const handleSignout = async () => {
    try {
      if (isLoading) return;
      await signout().unwrap();

      dispatch(logout());
      navigate("/account");
    } catch (err) {
      // console.log(err);

      if (isError) {
        toast({
          variant: "destructive",
          title: "An error occurred during sign out.",
        });
      }
    }
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-lg font-bold">
          <Link to="/">Clothify</Link>
        </div>

        <Navbar />

        <div className="hidden lg:flex items-center space-x-2">
          <Input type="text" placeholder="Search..." className="w-72" />
          <Button>
            {" "}
            <Search size={20} />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <button title="Search" className="lg:hidden hover:text-gray-700">
                <Search size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="p-4">
              <div className="flex items-center space-x-2">
                <Input type="text" placeholder="Search..." className="w-full" />
                <Button>
                  <Search size={20} />
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <button title="Cart" className="hover:text-gray-700">
            <ShoppingCart size={20} />
          </button>
          {userInfo?.token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={isLoading}>
                <button
                  disabled={isLoading}
                  title="Profile"
                  className="hover:text-gray-700"
                >
                  <User size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleSignout}
                  >
                    <LogOutIcon />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button title="Profile" className="hover:text-gray-700">
              <Link to={"/account"}>
                <User size={20} />
              </Link>
            </button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden hover:text-gray-700">
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 p-4">
                <Link to="/shop" className="hover:text-gray-700">
                  Shop
                </Link>
                <Link to="/categories" className="hover:text-gray-700">
                  Categories
                </Link>
                <Link to="/deals" className="hover:text-gray-700">
                  Deals
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
