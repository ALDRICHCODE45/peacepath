"use server";

import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const unlockGoal = async (goalId: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return {
      ok: false,
      message: "user not found",
    };
  }

  await prisma.challenge.update({
    where: {
      id: goalId,
    },
    data: {
      State: "Unlocked",
    },
  });
  revalidatePath("/dashboard/challenges");
};
