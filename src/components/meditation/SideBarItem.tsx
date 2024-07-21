"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideBarItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pathName = usePathname();
  return (
    <Link href={href}>
      <span
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition",
          {
            "bg-gray-200 dark:bg-gray-700": pathName === href,
          }
        )}
      >
        <div className="h-6 w-6 dark:text-white font-normal">{icon}</div>
        <span className="text-sm font-medium text-black dark:text-white">
          {label}
        </span>
      </span>
    </Link>
  );
}
