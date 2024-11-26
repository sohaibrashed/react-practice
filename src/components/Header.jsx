import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="text-lg font-bold">
          <Link to="/">Clothify</Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link to="/shop" className="hover:text-gray-700">
            Shop
          </Link>
          <Link to="/categories" className="hover:text-gray-700">
            Categories
          </Link>
          <Link to="/deals" className="hover:text-gray-700">
            Deals
          </Link>
        </nav>

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

          <button title="Profile" className="hover:text-gray-700">
            <Link to={"/account"}>
              <User size={20} />
            </Link>
          </button>

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
