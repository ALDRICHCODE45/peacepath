import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Chat from "./ui/Chat";
import prisma from "@/app/lib/db";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

export const maxDuration = 60;

export const metadata: Metadata = {
  title: "Peace Path - Talking Sone",
};

const getData = async () => {
  noStore();
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const messages = await prisma.message.findMany({
    where: {
      userId: user.id,
    },
  });

  return messages.map((message) => ({
    id: message.id,
    text: message.text,
    isKaiMessage: message.isKaiMessage,
  }));
};

export default async function Page() {
  const initialMessages = await getData();

  return (
    <>
      <Chat initialMessages={initialMessages} />
    </>
  );
}
