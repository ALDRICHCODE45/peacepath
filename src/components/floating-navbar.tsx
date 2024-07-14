import { cn } from "@/lib/utils";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const FloatingNav = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user);
  return (
    <div
      className={cn(
        "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black  bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-6 pl-6 py-2  items-center justify-center space-x-4"
      )}
    >
      {user ? (
        <LogoutLink>Log Out</LogoutLink>
      ) : (
        <>
          <LoginLink
            className={cn(
              "border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
            )}
          >
            <span className="hidden sm:block text-sm">Sign in</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
          </LoginLink>

          <RegisterLink
            className={cn(
              "border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
            )}
          >
            <span className="hidden sm:block text-sm">Sign up</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
          </RegisterLink>
        </>
      )}
    </div>
  );
};
