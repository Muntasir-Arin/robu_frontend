'use client'
import { ModeToggleCustom } from "./theme-mode";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./dashboard-mobile-sidebar";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/utils/checkauth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function Header() {

  const { userData } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-7">
        <div className="hidden md:block">
        <Link href="/" key="home-link">
          <Image src="/robu.svg" alt="Logo" width={40} height={40} />
        </Link>
        </div>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
        <AvatarImage src={userData?.avatar} alt="@shadcn" />
        <AvatarFallback>{userData?.name}</AvatarFallback>
      </Avatar>
          <ModeToggleCustom className="w-10 h-10"/>
        </div>
      </nav>
    </div>
  );
}