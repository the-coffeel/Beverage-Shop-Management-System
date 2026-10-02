import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  ChevronsUpDownIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  LogOutIcon,
  PlusIcon,
  CheckIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type Workspace = {
  id: string
  name: string
  initials: string
  color: string 
  memberCount?: number
}

export function NavUser({
  user,
  workspaces = [],
  activeWorkspaceId,
  onSelectWorkspace,
  onCreateOrJoinWorkspace,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
  workspaces?: Workspace[]
  activeWorkspaceId?: string
  onSelectWorkspace?: (workspaceId: string) => void
  onCreateOrJoinWorkspace?: () => void
  onAddAccount?: () => void
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-muted aria-expanded:text-foreground"
              />
            }
          >
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-64 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            {/* Email header */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                {user.email}
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            {/* Workspaces */}
            {workspaces.length > 0 && (
              <>
                <DropdownMenuGroup>
                  {workspaces.map((workspace, index) => (
                    <DropdownMenuItem
                      key={workspace.id}
                      onClick={() => onSelectWorkspace?.(workspace.id)}
                      className="gap-2"
                    >
                      <div
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
                          workspace.color
                        )}
                      >
                        {workspace.initials}
                      </div>
                      <span className="flex-1 truncate">{workspace.name}</span>
                      {workspace.id === activeWorkspaceId ? (
                        <CheckIcon className="size-4 shrink-0" />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {index + 1}
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}

            {/* Account section */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                Account
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onCreateOrJoinWorkspace}>
                <PlusIcon />
                Create or join a workspace...
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheckIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}