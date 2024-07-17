import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";
import Link from "next/link";
import { BotIcon, HeartPulse, MessageCircle, PieChart } from "lucide-react";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) {
    return redirect("/api/auth/login");
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <div className="flex min-h-screen w-full">
        <aside className="border-r dark:border-[#363b3d] bg-muted/40 p-4 sm:p-6 bg-white dark:bg-[#181a1b] min-w-[250px]">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full b text-lg font-semibold text-primary-foreground">
              <Link href="/">
                <div className="bg-[#f4f4f5] dark:bg-black rounded-lg w-10 h-10 flex justify-center items-center">
                  <BotIcon className="text-black dark:text-white" />
                </div>
              </Link>
            </div>
            <div className="grid gap-1">
              <div className="font-medium text-black dark:text-white">
                {user.given_name}
              </div>
            </div>
          </div>
          <Separator className="my-6 " />

          <div className="grid gap-4">
            <OptionLink
              href="/dashboard/talking-sone"
              icon={<MessageCircle width={22} />}
              label="Talking sone"
            />
            <OptionLink
              href="/dashboard/meditation"
              icon={<HeartPulse width={22} />}
              label="Meditation"
            />
            <OptionLink
              href="/dashboard/challenges"
              icon={<PieChart width={22} />}
              label="Challenges"
            />
          </div>
        </aside>

        <main className="flex flex-1 flex-col">
          <header className="border-b dark:border-b-[#363b3d] bg-muted/40 p-4 sm:p-6 bg-white dark:bg-[#181a1b]">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/koala_profile.jpg" />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
              <div className="flex w-full justify-between">
                <div className="">
                  <p className="font-medium text-black dark:text-white">KAI</p>
                  <Badge variant="success">Online</Badge>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-[#181a1b] h-full">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export function OptionLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href}>
      <span className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        <div className="h-6 w-6 dark:text-white font-normal">{icon}</div>
        <span className="text-sm font-medium text-black dark:text-white">
          {label}
        </span>
      </span>
    </Link>
  );
}
