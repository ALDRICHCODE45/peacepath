import { type ReactElement } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import DefaultUser from "../../../public/placeholder-user.png";
import Image from "next/image";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export interface UserDropDownProps {
  image?: string;
}

export function UserDropDown({ image }: UserDropDownProps): ReactElement {
  const imageToShow = image ? image : DefaultUser;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-6 text-black dark:text-white" />
          <Image
            className="rounded-full h-8 w-8 hidden lg:block"
            src={imageToShow}
            alt="default user"
            width={750}
            height={750}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem>
          <Link className="w-full" href="/dashboard/talking-zone">
            Talking Zone
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/dashboard/meditation">
            My Meditations
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/dashboard/challenges">
            Challenges
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className="w-full">Log out</LogoutLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/" className="w-full">
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
