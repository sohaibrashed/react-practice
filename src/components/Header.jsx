import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  ShoppingCart,
  User,
  Search,
  LogOutIcon,
  ShieldAlert,
} from "lucide-react";
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
import CartDrawer from "./CartDrawer";
import { resetCart } from "@/services/cartSlice";
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/services/categoryApi";

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signout, { isLoading, isError }] = useSignoutMutation();
  const { data: categories, isLoading: loadingCategory } =
    useGetCategoriesQuery();
  const { data: subCategories, isLoading: loadingSubCategory } =
    useGetSubCategoriesQuery();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSignout = async () => {
    try {
      if (isLoading) return;
      await signout().unwrap();

      dispatch(resetCart());
      dispatch(logout());
      navigate("/account");
    } catch (err) {
      // console.log(err);
    }
  };

  if (isError) {
    toast({
      variant: "destructive",
      title: "An error occurred during sign out.",
    });
  }
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <h4 className="text-2xl font-bold text-pink-600">
          <Link to="/">Clothify</Link>
        </h4>

        <Navbar
          categories={categories?.data}
          subCategories={subCategories?.data}
          isLoading={loadingCategory || loadingSubCategory}
        />

        <div className="hidden lg:flex items-center space-x-2">
          <Input type="text" placeholder="Search..." className="w-72" />
          <Button>
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

          <Sheet>
            <SheetTrigger>
              <div className="relative">
                <button title="Cart" className="hover:text-gray-700 pt-1">
                  <ShoppingCart size={20} />
                </button>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </SheetTrigger>
            <CartDrawer />
          </Sheet>
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
                  {["admin", "owner"].includes(userInfo.role) && (
                    <DropdownMenuItem
                      className="text-green-500"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      <ShieldAlert />
                      <span>Admin Portal</span>
                    </DropdownMenuItem>
                  )}
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
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "hover:text-gray-700 border-b-2 border-slate-300"
                      : "hover:text-gray-700"
                  }
                >
                  Home
                </NavLink>
                <Link to="/categories" className="hover:text-gray-700">
                  Categories
                </Link>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "hover:text-gray-700 border-b-2 border-slate-300"
                      : "hover:text-gray-700"
                  }
                >
                  Contact us
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "hover:text-gray-700 border-b-2 border-slate-300"
                      : "hover:text-gray-700"
                  }
                >
                  About us
                </NavLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
