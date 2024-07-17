import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Chat from "./ui/Chat";
import prisma from "@/app/lib/db";
import { Metadata } from "next";
import { unstable_noStore as noSotore } from "next/cache";

export const metadata: Metadata = {
  title: "Peace Path - Talking Sone",
};
export default async function Page() {
  noSotore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const mensajes = await prisma.message.findMany({
    where: {
      userId: user.id,
    },
  });

  const initialMessages = mensajes.map((message) => ({
    id: message.id,
    text: message.text,
    isKaiMessage: message.isKaiMessage,
  }));

  return (
    <>
      <main className="">
        <Chat initialMessages={initialMessages} />
      </main>
    </>
  );
}
