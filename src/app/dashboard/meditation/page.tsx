import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Reproductor from "./ui/Reproductor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peace Path - Personal Meditations",
};

const getUserAudios = async () => {
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
      <Reproductor initialAudios={userAudios} />
    </>
  );
}
