
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/dashboard";
import { cn } from "@/lib/utils";
import Header from "@/components/dashboard-header";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
          <Header/>
      <div className="flex h-screen overflow-hidden">

      <nav
      className={cn(`relative hidden h-screen border-r pt-16 md:block w-72`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1 ">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            
            <DashboardNav items={navItems} /> 
          </div>
        </div>
      </div>
    </nav> 
    
        <main className="w-full pt-16 overflow-y-auto">{children}</main> 
      </div>
    </>
  );
}