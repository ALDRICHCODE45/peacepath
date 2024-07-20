import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { SideBar } from "@/components/meditation/SideBar";
import { Header } from "@/components/meditation/Header";

export const metadata: Metadata = {
  title: "Peace Path",
};

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
      defaultTheme="system"
      disableTransitionOnChange
    >
      <Toaster />
      <div className="flex min-h-screen w-full">
        <SideBar username={user.given_name!} />
        <main className="flex flex-1 flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-[#181a1b] h-full">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
