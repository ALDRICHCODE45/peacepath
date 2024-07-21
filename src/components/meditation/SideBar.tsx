import Link from "next/link";
import { type ReactElement } from "react";
import { Separator } from "../ui/separator";
import {
  BubbleChatIcon,
  ChartIcon,
  HealtcareIcon,
  UserIcon,
} from "./icons/DasboardIcons";
import { SideBarItem } from "./SideBarItem";

export interface SideBarProps {
  username: string;
}
const Items = [
  {
    href: "/dashboard/talking-sone",
    icon: <BubbleChatIcon className="text-black dark:text-white" />,
    label: "Talking sone",
  },
  {
    href: "/dashboard/meditation",
    icon: <HealtcareIcon className="text-black dark:text-white" />,
    label: "Meditation",
  },
  {
    href: "/dashboard/challenges",
    icon: <ChartIcon className="text-black dark:text-white" />,
    label: "Challenges",
  },
];

export function SideBar({ username }: SideBarProps): ReactElement {
  return (
    <aside className="sm:border-r dark:border-[#363b3d] sm:bg-muted/40 p-4 sm:p-6 sm:bg-white dark:bg-[#181a1b] md:min-w-[250px] hidden ">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full b text-lg font-semibold text-primary-foreground">
          <Link href="/">
            <div className="bg-[#f4f4f5] dark:bg-black rounded-lg w-10 h-10 flex justify-center items-center">
              <UserIcon className="text-black dark:text-white" />
            </div>
          </Link>
        </div>
        <div className="grid gap-1">
          <div className="font-medium text-black dark:text-white">
            {username}
          </div>
        </div>
      </div>
      <Separator className="my-6 " />

      <div className="grid gap-4">
        {Items.map((item) => (
          <SideBarItem {...item} key={item.href} />
        ))}
      </div>
    </aside>
  );
}
