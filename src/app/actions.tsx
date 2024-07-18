"use server";
import { generateId } from "ai";
import { createAI, createStreamableUI, createStreamableValue } from "ai/rsc";
import { OpenAI } from "openai";
import { ReactNode } from "react";
import { Message } from "./dashboard/talking-sone/message";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";

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
    try {
      let threadId = thread_id;

      if (thread_id != null) {
        const newMessage = await openai.beta.threads.messages.create(
          thread_id,
          {
            role: "user",
            content: question,
          }
        );
        await prisma.message.create({
          data: {
            text: question,
            userId: dbUser!.id,
            isKaiMessage: false,
          },
        });
        console.log({ newMessage, on: "if" });
      } else {
        const thread = await openai.beta.threads.create();
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            thread_id: thread.id,
          },
        });
        threadId = thread.id;
        console.log({ thread, on: "else" });

        const message = await openai.beta.threads.messages.create(thread.id, {
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
        console.log({ message, on: "else" });
      }

      const run = await openai.beta.threads.runs.create(threadId!, {
        assistant_id: ASSISTANT_ID,
        stream: true,
      });

      runQueue.push({ id: generateId(), run });

      let finalKaiText = "";

      while (runQueue.length > 0) {
        const latestRun = runQueue.shift();

        if (latestRun) {
          for await (const delta of latestRun.run) {
            const { data, event } = delta;
            if (event === "thread.message.delta") {
              data.delta.content?.map((part) => {
                if (part.type === "text" && part.text) {
                  finalKaiText += part.text.value;
                  textStream.append(part.text.value as string);
                }
              });
            } else if (event === "thread.run.failed") {
              console.error(data);
            }
          }
        }
      }

      textStream.done();

      await prisma.message.create({
        data: {
          text: finalKaiText,
          userId: dbUser!.id,
          isKaiMessage: true,
        },
      });
    } catch (error) {
      console.error("Error processing message:", error);
      textStream.done();
    }
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
