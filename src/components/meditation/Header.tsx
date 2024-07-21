import { type ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { UserDropDown } from "./UserDropDown";

export interface HeaderProps {}

export function Header({}: HeaderProps): ReactElement {
  return (
    <header className="border-b dark:border-b-[#363b3d] bg-muted/40 p-4 sm:p-6 bg-white dark:bg-[#181a1b] sticky ">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/koala_profile.jpg" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="flex w-full">
          <div>
            <p className="font-medium text-black dark:text-white">KAI</p>
            <Badge variant="success">Online</Badge>
          </div>
          <ThemeToggle />
          <div className="justify-end hidden sm:block">
            <UserDropDown />
          </div>
        </div>
      </div>
    </header>
  );
}
