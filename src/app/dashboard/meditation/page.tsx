import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Reproduction from "./ui/Reproduction";

export const maxDuration = 60;

export const metadata: Metadata = {
  title: "Peace Path - Personal Meditations",
};

const getUserAudios = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("user not found");
  const userAudios = await prisma.audio.findMany({
    where: { userId: user.id },
    select: {
      url: true,
    },
  });
  console.log({ userAudios });
  return userAudios;
};

export default async function MeditationPage() {
  const userAudios = await getUserAudios();

  return (
    <>
      <Reproduction initialAudios={userAudios} />
    </>
  );
}
