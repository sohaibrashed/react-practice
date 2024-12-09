import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../Logo";
import {
  ChartNoAxesCombined,
  ChevronDown,
  CircleGauge,
  LogOut,
  Package,
  Settings,
  ShoppingBasket,
  SquareKanban,
  User,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useDispatch } from "react-redux";
import { resetCart } from "@/services/cartSlice";
import { logout } from "@/services/authSlice";
import { useSignoutMutation } from "@/services/usersApi";
import { useToast } from "@/hooks/use-toast";

export function AppSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signout, { isLoading, isError, isSuccess }] = useSignoutMutation();

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

  if (isSuccess) {
    toast({
      title: "Signed out Successfully 👋",
    });
  }
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center px-4 py-3 font-bold text-lg border-b border-gray-700">
        <Link to={"/"}>
          <Logo className={"rounded-full w-16 h-16"} />
        </Link>
        <div className="">
          <h4 className="text-lg font-bold text-pink-600">
            <Link to="/">Clothify</Link>
          </h4>
          <p className="text-xs text-gray-500">E-Commerce Store</p>
        </div>
        <button
          onClick={handleSignout}
          className="hover:bg-gray-500 hover:rounded-full p-2 hover:text-slate-300"
        >
          <LogOut size={16} />
        </button>
      </SidebarHeader>
      <SidebarContent className="flex-1 px-2">
        <SidebarGroup>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex justify-start items-center gap-2 py-2 px-3 rounded-lg ${
                isActive ? "bg-gray-800" : "hover:bg-gray-700"
              }`
            }
          >
            <CircleGauge size={18} className="stroke-pink-400" />
            Dashboard
          </NavLink>
          {/* <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `flex justify-start items-center gap-2 py-2 px-3 rounded-lg ${
                isActive ? "bg-gray-800" : "hover:bg-gray-700"
              }`
            }
          >
            <ChartNoAxesCombined size={20} />
            Analytics
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex justify-start items-center gap-2 py-2 px-3 rounded-lg ${
                isActive ? "bg-gray-800" : "hover:bg-gray-700"
              }`
            }
          >
            <Settings />
            Settings
          </NavLink> */}

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="flex justify-start items-center gap-2 py-2 px-3 rounded-lg">
                  <SquareKanban size={18} className="stroke-pink-400" />

                  <span className="text-base">Inventory</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <NavLink
                      to="/admin/orders"
                      className={({ isActive }) =>
                        `flex justify-start items-center gap-2 py-2 px-3 rounded-lg ${
                          isActive ? "bg-gray-800" : "hover:bg-gray-700"
                        }`
                      }
                    >
                      <Package size={18} className="stroke-pink-400" />
                      Orders
                    </NavLink>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <NavLink
                      to="/admin/products"
                      className={({ isActive }) =>
                        `flex justify-start items-center gap-2 py-2 px-3 rounded-lg ${
                          isActive ? "bg-gray-800" : "hover:bg-gray-700"
                        }`
                      }
                    >
                      <ShoppingBasket size={18} className="stroke-pink-400" />
                      Products
                    </NavLink>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <NavLink
                      to="/admin/users"
                      className={({ isActive }) =>
                        `flex justify-start items-center gap-2 py-2 px-3 rounded-lg ${
                          isActive ? "bg-gray-800" : "hover:bg-gray-700"
                        }`
                      }
                    >
                      <User size={18} className="stroke-pink-400" />
                      Users
                    </NavLink>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3 border-t border-gray-700">
        <div className="text-sm">
          © {new Date().getFullYear()} Clothify - Admin Panel
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
