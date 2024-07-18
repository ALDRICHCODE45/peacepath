"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OpenAI } from "openai";
import { generateId } from "ai";
import { uploadFileToS3 } from "@/actions/uploadAudioToAwsS3";
import { revalidatePath } from "next/cache";
import prisma from "@/app/lib/db";
import { CREATE_PROMPT_AUDIO } from "@/app/dashboard/meditation/prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createPersonalMeditation = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log({ openaikey: process.env.OPENAI_API_KEY });
    console.log({ aws: process.env.AWS_S3_ACCESS_KEY });

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

    if (!dbUser) {
      throw new Error("User not found in database");
    }

    console.log({ messages: dbUser!.messages });

    const userInfo = dbUser.messages.map((msg) => msg.text).join(". ") + ".";

    const instrucciones = CREATE_PROMPT_AUDIO();

    let promptResponse;
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

    revalidatePath("/dashboard/meditation");
    return url;
  } catch (error) {
    console.error("Error creating personal meditation:", error);
    throw error;
  }
};
