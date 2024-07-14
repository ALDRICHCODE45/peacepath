import { type ReactElement } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { InitSheet } from "../sheet/InitSheet";

export interface NavbarButtonsProps {}

export function NavbarButtons({}: NavbarButtonsProps): ReactElement {
  const user = "aldrich";
  return (
    <>
      {user ? (
        <>
          <div className="flex items-center justify-center ">
            <InitSheet />
          </div>
        </>
      ) : (
        <>
          <Button
            asChild
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow "
          >
            <Link href="/auth/login">Login</Link>
          </Button>

          <div className="sm:flex">
            <Button
              asChild
              className="rounded-md  px-5 py-2.5 text-sm font-medium text-primary "
            >
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </>
      )}
    </>
  );
}
