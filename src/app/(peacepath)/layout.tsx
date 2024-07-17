import React from "react";
import { FloatingNav } from "@/components/navbar/floating-navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peace Path - Home",
};

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
