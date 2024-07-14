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
  }));

  return (
    <>
      <Chat initialMessages={initialMessages} />
    </>
  );
}

{
  /* import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; */
}
{
  /* import { Button } from "@/components/ui/button"; */
}
{
  /* import { Input } from "@/components/ui/input"; */
}
{
  /* import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; */
}

{
  /* export default async function Component() { */
}
{
  /*   const { getUser } = getKindeServerSession(); */
}
{
  /*   const user = await getUser(); */
}
{
  /*   return ( */
}
{
  /*     <> */
}
{
  /*       <div className="grid gap-4"> */
}
{
  /*         <div className="flex items-start gap-4"> */
}
{
  /*           <Avatar className="h-10 w-10"> */
}
{
  /*             <AvatarImage src="/placeholder-user.png" /> */
}
{
  /*             <AvatarFallback>KA</AvatarFallback> */
}
{
  /*           </Avatar> */
}
{
  /*           <div className="grid gap-2 rounded-lg bg-muted p-3 text-sm dark:bg-[#27272a]"> */
}
{
  /*             <div className="text-black dark:text-white"> */
}
{
  /*               Hi {user?.username}! You’re in a safe place to share your */
}
{
  /*               thoughts. How can I support you today? */
}
{
  /*             </div> */
}
{
  /*           </div> */
}
{
  /*         </div> */
}
{
  /*         <div className="flex items-start gap-4 justify-end"> */
}
{
  /*           <div className="grid gap-2 rounded-lg bg-[#fafafa] p-3 text-sm text-primary-foreground"> */
}
{
  /*             <div className="text-black">Im felling bad today</div> */
}
{
  /*           </div> */
}
{
  /*           <Avatar className="h-10 w-10"> */
}
{
  /*             <AvatarImage src="/placeholder-user.png" /> */
}
{
  /*             <AvatarFallback>CB</AvatarFallback> */
}
{
  /*           </Avatar> */
}
{
  /*         </div> */
}
{
  /*         <div className="flex items-start gap-4"> */
}
{
  /*           <Avatar className="h-10 w-10"> */
}
{
  /*             <AvatarImage src="/placeholder-user.png" /> */
}
{
  /*             <AvatarFallback>KA</AvatarFallback> */
}
{
  /*           </Avatar> */
}
{
  /*           <div className="grid gap-2 rounded-lg bg-muted p-3 text-sm dark:bg-[#27272a]"> */
}
{
  /*             <div className="text-black dark:text-white">look for help</div> */
}
{
  /*           </div> */
}
{
  /*         </div> */
}
{
  /*       </div> */
}
{
  /*       <div className="bottom-0 absolute w-[1610px]"> */
}
{
  /*         <footer className="border-t bg-muted/40 p-4 sm:p-6 bg-white dark:bg-[#181a1b]"> */
}
{
  /*           <div className="flex items-center gap-4"> */
}
{
  /*             <Input */
}
{
  /*               placeholder="Type your message..." */
}
{
  /*               className="dark:bg-white bg-white text-black " */
}
{
  /*             /> */
}
{
  /*             <Button>Send</Button> */
}
{
  /*           </div> */
}
{
  /*         </footer> */
}
{
  /*       </div> */
}
{
  /*     </> */
}
{
  /*   ); */
}
{
  /* } */
}
