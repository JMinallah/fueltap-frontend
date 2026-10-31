"use client";

import { splitName } from "@/lib/helpers/help";
import Logo from "../web/Logo";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Menu,
  Package,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useEffect, useState } from "react";
import { logoutAction } from "@/lib/server/auth";
import { toast } from "../ui/toast";


const adminLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Stations", path: "/admin/stations", icon: Zap },
  { name: "Managers", path: "/admin/managers", icon: Users },
  { name: "Inventory", path: "/admin/inventory", icon: Package },
];

const accountItemClassName =
  "flex w-full cursor-pointer items-center px-6 py-3 text-left text-sm text-black transition-colors hover:bg-gray-100 md:px-7 md:py-3.5 md:text-base";

export default function AdminHeader() {
  const { user } = useAuth();
  const initials = splitName?.(user?.profile.fullName || "admin");

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const router = useRouter();

  async function handleAdminLogout() {
    if (!user?.id) {
      router.replace("/admin/login");
      return;
    }
    toast.promise(
      (async () => {
        const res = await logoutAction(user.id, window.location.pathname);
        if (!res?.success) throw new Error("Could not log out.");
        router.replace("/admin/login");
      })(),
      {
        loading: "Logging out…",
        success: "Logged out successfully.",
        error: "Could not log out.",
      },
    );
  }

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);


  useScrollLock(
    menuOpen ||
      (accountOpen && window.matchMedia("(max-width: 767px)").matches),
  );

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "relative inset-x-0 top-0 w-full border-b border-gray-100 bg-white md:fixed",
        menuOpen ? "z-1100" : "z-10",
      )}
    >
      <div className="container flex items-center justify-between gap-4 py-3 xl:py-4">
        {/* ===== Menu toggle (below xl) ===== */}
        <div className="flex flex-1 items-center gap-4 xl:hidden">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="admin-nav-menu"
            className="cursor-pointer text-black"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ===== Logo ===== */}
        <div className="flex shrink-0 justify-center xl:justify-start">
          <Logo />
        </div>

        {/* ===== Desktop nav tabs ===== */}
        <nav className="hidden items-center gap-1 xl:flex">
          {adminLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                isActive(link.path)
                  ? "bg-primary-50 text-primary-500"
                  : "text-grey-800 hover:bg-gray-100 hover:text-black",
              )}
            >
              <link.icon size={16} />
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ===== Notifications + account ===== */}
        <div className="flex flex-1 items-center justify-end gap-4 xl:flex-none xl:gap-6">
          <button
            type="button"
            aria-label="Notifications"
            className="text-grey-800 hidden cursor-pointer hover:text-black md:block"
          >
            <Bell size={22} />
          </button>

          <Popover
            open={accountOpen}
            onOpenChange={(open) => {
              setAccountOpen(open);
              if (open) setMenuOpen(false);
            }}
          >
            <PopoverTrigger
              aria-label="Account menu"
              className="flex cursor-pointer items-center gap-2 text-left"
            >
              <span className="hidden max-w-40 flex-col md:flex">
                <span className="truncate text-base text-black capitalize">
                  {user?.profile.fullName}
                </span>
                <span className="text-grey-800 truncate text-sm">
                  {user?.profile.email}
                </span>
              </span>
              <Avatar className="size-10 xl:size-11">
                <AvatarFallback className="bg-secondary-500 text-sm font-medium text-white xl:text-base">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown
                size={20}
                className={cn(
                  "text-black transition-transform duration-200",
                  accountOpen && "rotate-180",
                )}
              />
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-60 gap-0 divide-y divide-gray-100 overflow-hidden rounded-xl p-0 md:w-94"
            >
              <Link
                href="/admin/account-settings"
                className={accountItemClassName}
                onClick={() => setAccountOpen(false)}
              >
                Account Settings
              </Link>
              <button
                type="button"
                className={cn(accountItemClassName, "md:hidden")}
                onClick={() => setAccountOpen(false)}
              >
                Notification
              </button>
              <button
                type="button"
                className={accountItemClassName}
                onClick={() => {
                  setAccountOpen(false);
                  void handleAdminLogout();
                }}
              >
                Log Out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* ===== Mobile nav menu overlay ===== */}
      {menuOpen && (
        <div
          id="admin-nav-menu"
          className="absolute inset-x-0 top-full h-dvh bg-black/25 xl:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="container pt-2">
            <nav
              aria-label="Admin navigation"
              className="flex w-full flex-col gap-1 rounded-2xl bg-white p-3 shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {adminLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.path) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-primary-50 text-primary-500"
                      : "text-grey-800 hover:bg-gray-100 hover:text-black",
                  )}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
