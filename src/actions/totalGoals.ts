"use server";

import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

interface Args {
  lockGoals?: number;
  unlockedGoals?: number;
  ok: boolean;
}

export const getLockAndUnlockedGoals = async (): Promise<Args> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return {
      ok: false,
    };
  }

  const lockGoals = await prisma.challenge.count({
    where: {
      UserId: user.id,
    },
  });

  const unlockedGoals = await prisma.challenge.count({
    where: {
      UserId: user.id,
      State: "Unlocked",
    },
  });

  revalidatePath("/dashboard/challenges");
  return {
    ok: true,
    lockGoals,
    unlockedGoals,
  };
};
