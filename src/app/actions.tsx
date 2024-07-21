"use server";
import { generateId } from "ai";
import { createAI, createStreamableUI, createStreamableValue } from "ai/rsc";
import { OpenAI } from "openai";
import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { Message } from "./dashboard/talking-zone/message";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ClientMessage {
  id: string;
  text: ReactNode;
  isKaiMessage: boolean;
}

const ASSISTANT_ID = "asst_OS10mO1yEGPJPYHrGJYf7Cfz";

export async function submitMessage(question: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) throw new Error("user not found");

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      thread_id: true,
      id: true,
    },
  });
  const thread_id = dbUser?.thread_id;
  console.log(thread_id);

  const textStream = createStreamableValue("");
  const textUIStream = createStreamableUI(
    <Message textStream={textStream.value} />
  );
  const runQueue = [];

  (async () => {
    if (thread_id != null) {
      const newMessage = await openai.beta.threads.messages.create(thread_id, {
        role: "user",
        content: question,
      });
      await prisma.message.create({
        data: {
          text: question,
          userId: dbUser!.id,
          isKaiMessage: false,
        },
      });
      //todo:guardar el mensaje del usuario en db
      console.log({ newMessage, on: "if" });

      const run = await openai.beta.threads.runs.create(thread_id, {
        assistant_id: ASSISTANT_ID,
        stream: true,
      });

      runQueue.push({ id: generateId(), run });
      console.log({ run });
    } else {
      const thread = await openai.beta.threads.create();
      //actualizar el thread del usuario.
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          thread_id: thread.id,
        },
      });
      console.log({ thread, on: "else" });

      const message = await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: question,
      });
      //actualizar el mensaje del usuario
      await prisma.message.create({
        data: {
          text: question,
          userId: dbUser!.id,
          isKaiMessage: false,
        },
      });

      console.log({ message, on: "else" });

      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: ASSISTANT_ID,
        stream: true,
      });

      runQueue.push({ id: generateId(), run });
    }
    let finalKaiText: string = "";

    while (runQueue.length > 0) {
      const latestRun = runQueue.shift();

      if (latestRun) {
        for await (const delta of latestRun.run) {
          const { data, event } = delta;
          if (event === "thread.message.delta") {
            data.delta.content?.map((part) => {
              if (part.type === "text") {
                if (part.text) {
                  finalKaiText += part.text.value;
                  textStream.append(part.text.value as string);
                }
              }
            });
          } else if (event === "thread.run.failed") {
            console.error(data);
          }
        }
      }
    }

    textStream.done();
    textUIStream.done();

    //guardar en db el mensaje de Kai
    await prisma.message.create({
      data: {
        text: finalKaiText,
        userId: dbUser!.id,
        isKaiMessage: true,
      },
    });
  })();

  return {
    id: generateId(),
    text: textUIStream.value,
    isKaiMessage: true,
  };
}

export const AI = createAI({
  actions: {
    submitMessage,
  },
});
