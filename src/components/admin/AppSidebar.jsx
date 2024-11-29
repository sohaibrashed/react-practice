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
import { Link, NavLink } from "react-router";
import Logo from "../Logo";
import {
  ChartNoAxesCombined,
  CircleGauge,
  ListOrdered,
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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3 font-bold text-lg border-b border-gray-700">
        <Link to={"/"}>
          <Logo className={"w-20"} />
        </Link>
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
            <CircleGauge size={20} />
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
                <SidebarMenuButton>
                  <SquareKanban />
                  <span className="text-base font-semibold">Inventory</span>
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
                      <Package />
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
                      <ShoppingBasket />
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
                      <User />
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
