import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { Separator } from "../ui/separator";

export function Navbar(): ReactElement {
  return (
    <header className="bg-transparent dark:bg-transparent top-0 z-50 sticky">
      <div className="mx-auto max-w-screen-2xl  px-4 sm:px-6 lg:px-8 bg-transparent sticky">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <Image src="/logoipsu.svg" alt="logo" width={68} height={68} />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-white transition hover:text-gray-500/75"
                    href="/home"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-white transition hover:text-gray-500/75"
                    href="/pricing"
                  >
                    Pricing{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-white transition hover:text-gray-500/75"
                    href="/gallery"
                  >
                    {" "}
                    Gallery{" "}
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4 ">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
}
