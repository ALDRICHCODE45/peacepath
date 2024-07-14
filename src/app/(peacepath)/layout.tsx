import React from "react";
import { FloatingNav } from "@/components/floating-navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function PeacePathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FloatingNav />
      {children}
    </>
  );
}
