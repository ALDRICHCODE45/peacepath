"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { OpenAI } from "openai";
import { generateId } from "ai";
import { CREATE_PROMPT_AUDIO } from "./meditation/prompt";
import { uploadFileToS3 } from "@/actions/uploadAudioToAwsS3";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createPersonalMeditation = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
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
  console.log({ dbUser });

  if (!dbUser) {
    throw new Error("User not found in database");
  }

  const userInfo = dbUser.messages.map((msg) => msg.text).join(". ") + ".";

  const instrucciones = CREATE_PROMPT_AUDIO();

  let promptResponse;
  try {
    promptResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: instrucciones,
        },
        {
          role: "user",
          content: userInfo,
        },
      ],
      model: "gpt-4-turbo",
    });
    console.log({ promptResponse });

    if (
      !promptResponse ||
      !promptResponse.choices ||
      !promptResponse.choices.length
    ) {
      throw new Error("Prompt generation error");
    }

    const generatedText = promptResponse.choices[0].message.content;

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: generatedText!,
      response_format: "mp3",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const fileName = `personal_meditation-${user.given_name}-${generateId()}-${
      user.id
    }`;
    await uploadFileToS3(buffer, fileName);

    const url = `https://kia-audios.s3.amazonaws.com/myfolder/${fileName}`;
    console.log({ url });
    await prisma.audio.create({
      data: {
        url,
        userId: user.id,
      },
    });

    return url;
  } catch (error) {
    console.error("Error creating personal meditation:", error);
    throw error;
  }
};
revalidatePath("/dashboard/meditation");
