"use server";
import { generateId } from "ai";
import { createAI, createStreamableUI, createStreamableValue } from "ai/rsc";
import { OpenAI } from "openai";
import { ReactNode } from "react";
import { Message } from "./dashboard/talking-sone/message";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { RunStreamEvent } from "openai/resources/beta/assistants.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ClientMessage {
  id: string;
  text: ReactNode;
  isKaiMessage: boolean;
}

const ASSISTANT_ID = "asst_OS10mO1yEGPJPYHrGJYf7Cfz";

async function getThreadId(userId: string) {
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { thread_id: true, id: true },
  });
  return dbUser?.thread_id;
}

async function createNewThread(userId: string, question: string) {
  const thread = await openai.beta.threads.create();
  await prisma.user.update({
    where: { id: userId },
    data: { thread_id: thread.id },
  });
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: question,
  });
  await prisma.message.create({
    data: { text: question, userId: userId, isKaiMessage: false },
  });
  return { thread, message };
}

async function handleRun(run: any, textStream: any) {
  let finalKaiText = "";
  for await (const delta of run) {
    const { data, event } = delta;
    if (event === "thread.message.delta") {
      data.delta.content?.forEach((part: any) => {
        if (part.type === "text" && part.text) {
          finalKaiText += part.text.value;
          textStream.append(part.text.value);
        }
      });
    } else if (event === "thread.run.failed") {
      console.error(data);
    }
  }
  return finalKaiText;
}

export async function submitMessage(question: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) throw new Error("user not found");

  const textStream = createStreamableValue("");
  const textUIStream = createStreamableUI(
    <Message textStream={textStream.value} />
  );
  const runQueue = [];

  try {
    const thread_id = await getThreadId(user.id);
    let finalKaiText = "";

    if (thread_id != null) {
      await openai.beta.threads.messages.create(thread_id, {
        role: "user",
        content: question,
      });
      await prisma.message.create({
        data: { text: question, userId: user.id, isKaiMessage: false },
      });
      const run = await openai.beta.threads.runs.create(thread_id, {
        assistant_id: ASSISTANT_ID,
        stream: true,
      });
      runQueue.push({ id: generateId(), run });
    } else {
      const { thread, message } = await createNewThread(user.id, question);
      const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: ASSISTANT_ID,
        stream: true,
      });
      runQueue.push({ id: generateId(), run });
    }

    while (runQueue.length > 0) {
      const latestRun = runQueue.shift();
      if (latestRun) {
        finalKaiText = await handleRun(latestRun.run, textStream);
      }
    }

    textStream.done();

    await prisma.message.create({
      data: { text: finalKaiText, userId: user.id, isKaiMessage: true },
    });
  } catch (error) {
    console.error("Error processing message:", error);
    textStream.done();
  }

  return {
    id: generateId(),
    text: textUIStream.value,
    isKaiMessage: true,
  };
}

export const AI = createAI({
  actions: { submitMessage },
});
