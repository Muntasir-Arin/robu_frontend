import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuth from "@/utils/checkauth";
import { Button } from "./ui/button";

export function UserNav() {
  const router = useRouter();
  const { handleLogout, isLoggedIn, userData } = useAuth();

  const handleLogoutClick = () => {
    // Call the logout functionality
    handleLogout();
    router.push('/');
  };

  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-12 h-12">
              <AvatarImage src={userData?.avatar} alt="@shadcn" />
              <AvatarFallback>{userData?.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 z-[100] mr-24 mt-1">
            <DropdownMenuGroup>
              <Link href={`/profile/${userData?.student_id}`}>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
                <DropdownMenuItem>
                  Dashboard
                  <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogoutClick}>
              Log out
              <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/login" key="login-link" >
            <Button variant="outline" className="rounded-full">
              Login
            </Button>
          </Link>
          <Link href="/register" key="register-link" >
            <Button variant="outline" className="rounded-full">
              Register
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
