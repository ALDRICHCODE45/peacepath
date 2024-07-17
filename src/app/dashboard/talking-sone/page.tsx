import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Chat from "./ui/Chat";
import prisma from "@/app/lib/db";

export default async function Page() {
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
