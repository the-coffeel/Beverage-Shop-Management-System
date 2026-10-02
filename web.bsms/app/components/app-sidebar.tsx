import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { BookOpenIcon, Settings2Icon, InboxIcon, PanelsTopLeft, PackageSearchIcon, UserGroupIcon, Wallet, Summary, ShoppingCart, ShoppingCartPlus } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
        {
      title: "Purchasing",
      url: "/purchasing",
      icon: (
        <ShoppingCartPlus/>
      ),
    },
        {
      title: "sales",
      url: "/sales",
      icon: (
        <ShoppingCart/>
      ),
    },
    {
      title: "Inventory",
      url: "/products",
      icon: (
        <PackageSearchIcon/>
      ),
      isActive: true,
      items: [
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Product Categories",
          url: "/products/categories",
        },
        {
          title: "Brands",
          url: "/products/brands",
        },
      ],
    },
    {
      title: "People",
      url: "/people/suppliers",
      icon: (
        <UserGroupIcon/>
      ),
      isFinite: true,
      items: [
        {
          title: "Supliers",
          url: "/people/suppliers",
        },
        {
          title: "Customers",
          url: "/people/customers",
        },
      ],
    },
    {
      title: "Finance",
      url: "/finance",
      icon: (
        <Wallet/>
      ),
      items: [
        {
          title: "Payments",
          url: "/finance/payments",
        },
        {
          title: "Expenses",
          url: "/finance/expenses",
        },
        {
          title: "Profit & Loss",
          url: "/finance/profit-loss",
        },
      ]
    },
    {
      title: "Reports",
      url: "/reports",
      icon: (
        <Summary/>
      ),items: [
        {
          title: "Sales Report",
          url: "/reports/sales",
        },
        {
          title: "Inventory Report",
          url: "/reports/inventory",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <PanelsTopLeft/>
      ),
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: (
        <InboxIcon/>
      ),
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavSecondary items={data.navSecondary}/>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ name: "Saroeun Khav", email: "khav.saroeun@gmail.com", avatar: "/avatar.png" }}
          workspaces={[
            { id: "saroeun-khav", name: "Saroeun Khav", initials: "SK", color: "bg-emerald-600" },
            { id: "coffeel", name: "coffeel", initials: "CO", color: "bg-blue-500" },
            { id: "myteam", name: "myteam", initials: "MY", color: "bg-green-600" },
          ]}
          activeWorkspaceId="saroeun-khav"
          onSelectWorkspace={(id) => console.log("switch to", id)}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
