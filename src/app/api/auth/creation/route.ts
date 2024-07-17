import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noSotore } from "next/cache";

export async function GET() {
  noSotore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user === null) {
    throw new Error("something went wrong");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        Username: user.username ?? "",
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        id: user.id ?? "",
      },
    });
  }
  return NextResponse.redirect("http://localhost:3000/dashboard");
}
