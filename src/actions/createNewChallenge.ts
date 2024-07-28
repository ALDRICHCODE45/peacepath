"use server";
import { openai } from "@ai-sdk/openai";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { generateText } from "ai";
import { systemMessage } from "./promt";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export interface ReturnAgs {
  error?: string;
  ok: boolean;
}

interface Message {
  text: string;
}

interface DbMessages {
  messages: Message[];
}

const getUserMessages = async (userId: string): Promise<DbMessages | null> => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      messages: {
        where: {
          isKaiMessage: false,
        },
        select: {
          text: true,
        },
      },
    },
  });
};

export const crateNewChallenge = async (): Promise<ReturnAgs> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user)
    return {
      error: "user not found",
      ok: false,
    };

  const userMessages = await getUserMessages(user.id);
  if (!userMessages || userMessages.messages.length < 3) {
    return {
      ok: false,
      error: "You do not have enough messages with kia",
    };
  }
  const userInfo =
    userMessages.messages.map((msg) => msg.text).join(". ") + ".";

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: systemMessage,
    prompt: userInfo,
  });

  let challengeData;
  try {
    challengeData = JSON.parse(text);
  } catch (error) {
    return {
      error: "Failed to parse the JSON response",
      ok: false,
    };
  }

  if (!challengeData.title || !challengeData.description) {
    return {
      error: "Invalid challenge data format",
      ok: false,
    };
  }

  await prisma.challenge.create({
    data: {
      title: challengeData.title,
      description: challengeData.description,
      UserId: user.id,
    },
  });

  revalidatePath("/dashboard/challenges");
  return {
    ok: true,
  };
};
