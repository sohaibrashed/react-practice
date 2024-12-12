import LoadingSpinner from "./ui/loadingSpinner";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Link, NavLink } from "react-router";

export default function Navbar({
  categories = [],
  subCategories = [],
  isLoading = false,
}) {
  console.log(categories, subCategories);

  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex space-x-6">
        <NavigationMenuItem>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive && "border-b-2 border-slate-300"
            }
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4 w-full max-w-3xl">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid h-96 w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] scroll-smooth overflow-y-auto">
                {categories.map((category) => (
                  <div key={category._id} className="w-1/4 min-w-[150px]">
                    <h5 className="text-slate-700 font-semibold mb-2">
                      {category.name}
                    </h5>
                    <ul className="space-y-1">
                      {subCategories
                        .filter((sub) => sub?.category?._id === category._id)
                        .map((subcategory) => (
                          <li key={subcategory._id}>
                            <NavigationMenuLink className="text-slate-600 hover:underline">
                              <Link
                                to={`/category/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}`}
                              >
                                {subcategory.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive && "border-b-2 border-slate-300"
            }
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact us
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive && "border-b-2 border-slate-300"
            }
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About us
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
