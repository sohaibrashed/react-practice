import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Link, NavLink } from "react-router";

const categories = {
  Clothing: ["Shirts", "Pants", "Jackets", "Sweaters"],
  Footwear: ["Shoes", "Boots", "Sandals", "Sneakers"],
  Accessories: ["Hats", "Belts", "Gloves", "Scarves"],
  Bags: ["Handbags", "Backpacks", "Wallets", "Duffel Bags"],
};

export default function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex space-x-6">
        <NavigationMenuItem>
          <NavigationMenuLink>
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
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:text-gray-700">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4 w-full max-w-3xl">
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {Object.entries(categories).map(([category, subcategories]) => (
                <div key={category} className="w-1/4 min-w-[150px]">
                  <h3 className="text-gray-800 font-semibold mb-2">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {subcategories.map((subcategory) => (
                      <li key={subcategory}>
                        <NavigationMenuLink className="block text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-md px-2 py-1 transition">
                          <Link
                            to={`/category/${category.toLowerCase()}/${subcategory.toLowerCase()}`}
                          >
                            {subcategory}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink>
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
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
