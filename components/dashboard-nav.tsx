"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardNavProps, Icons } from "@/constants/dashboard";
import useAuth from "@/utils/checkauth";
export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const {handleLogout, userData} = useAuth()

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2 ">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        console.log(userData?.is_admin)
        const condition = userData?.is_admin || (userData?.position && item.permissions.includes(userData.position))|| (userData?.position && item.permissions.includes('all'));
        return condition ? (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        ) : null;
      })}

      <Link
        key={69}
        href="/"
        onClick={() => {
          handleLogout()
          if (setOpen) setOpen(false);
        }}
      >
        <span
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>{'Logout'}</span>
        </span>
      </Link>
    </nav>
  );
}
