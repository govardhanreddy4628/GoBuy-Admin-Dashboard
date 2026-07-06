import { Search, Bell, User, Settings, Lock, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";
import { ThemeToggle } from "../../ui/themeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import LogoutDialog from "./logoutDialog";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header
        className={cn(
          "bg-white/95 backdrop-blur-sm sticky top-0 z-10 border-b dark:bg-gray-950",
          className
        )}
      >
        <div className="container flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <h1 className="text-lg font-semibold tracking-tight lg:text-xl">
            <span className="text-green-500">Go-</span>Board
          </h1>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <div className="relative flex items-center h-9 rounded-md px-3 bg-slate-200 dark:bg-gray-600 focus-within:ring-2 focus-within:ring-primary">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-[200px] lg:w-[280px] bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Notification Bell */}
            <button className="relative p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-200" />

              {/* Badge */}
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>

              {/* Count */}
              <span className="absolute -top-1 -right-1 text-[10px] bg-blue-500 text-white rounded-full px-1">
                2
              </span>
            </button>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">
                      admin@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/adminprofile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/adminsettings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/adminchangepassword")}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
      />
    </>
  );
}