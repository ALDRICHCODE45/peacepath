import { type ReactElement } from "react";
import Goals from "./Goals";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata: Metadata = {
  title: "Peace Path - Goals and good habits",
};

const getUserChallenges = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.challenge.findMany({
    where: {
      UserId: user.id,
    },
    select: {
      State: true,
      description: true,
      title: true,
      id: true,
      UserId: true,
    },
  });
};

export default async function Page(): Promise<ReactElement> {
  const initialData = await getUserChallenges();
  return (
    <>
      <main id="modal-root">
        <Goals initialGoals={initialData} />
      </main>
    </>
  );
}
