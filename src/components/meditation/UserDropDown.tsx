"use client";
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
import { usePathname } from "next/navigation";

export interface UserDropDownProps {
  image?: string;
}

export function UserDropDown({ image }: UserDropDownProps): ReactElement {
  const imageToShow = image ? image : DefaultUser;
  const pathName = usePathname();
  const links = [
    {
      href: "/dashboard/talking-zone",
      title: "Talking Zone",
    },
    {
      href: "/dashboard/meditation",
      title: "My Meditations",
    },
    {
      href: "/dashboard/challenges",
      title: "Challenges",
    },
  ];
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
        {links.map((link) => (
          <>
            <DropdownMenuItem>
              <Link
                className={`w-full ${
                  pathName === link.href ? "underline" : ""
                } `}
                href={link.href}
              >
                {link.title}
              </Link>
            </DropdownMenuItem>
          </>
        ))}
        <DropdownMenuSeparator className="font-bold" />
        <DropdownMenuItem>
          <LogoutLink className="w-full bg-gray-50">Log out</LogoutLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/" className="w-full bg-gray-50">
            Home
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
