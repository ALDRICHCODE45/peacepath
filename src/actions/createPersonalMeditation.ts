"use server";
// app/actions/createPersonalMeditation.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OpenAI } from "openai";
import { generateId } from "ai";
import prisma from "@/app/lib/db";
import { PROMPT } from "@/app/dashboard/meditation/prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Message {
  text: string;
}

interface DBUser {
  messages: Message[];
}

const getUserData = async (userId: string): Promise<DBUser | null> => {
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

const generatePromptResponse = async (userInfo: string): Promise<string> => {
  const instrucciones = PROMPT;
  const response = await openai.chat.completions.create({
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
  if (!response || !response.choices || !response.choices.length) {
    throw new Error("Prompt generation error");
  }
  return response.choices[0].message?.content ?? "";
};

const generateAudio = async (text: string): Promise<Buffer> => {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: text,
    response_format: "mp3",
  });
  return Buffer.from(await mp3.arrayBuffer());
};

const uploadFileToS3ViaAPI = async (
  audioBuffer: Buffer,
  fileName: string
): Promise<void> => {
  try {
    const response = await fetch("app/dashboard/api/uploadFiletoS3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audioBuffer: audioBuffer.toString("base64"), // Convert Buffer to base64 for JSON
        fileName,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error uploading file via API:", error);
    throw error;
  }
};

export const createPersonalMeditation = async (): Promise<string> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const dbUser = await getUserData(user.id);

  if (!dbUser) {
    throw new Error("User not found in database");
  }

  const userInfo = dbUser.messages.map((msg) => msg.text).join(". ") + ".";
  const generatedText = await generatePromptResponse(userInfo);
  const buffer = await generateAudio(generatedText);

  const fileName = `personal_meditation-${user.given_name}-${generateId()}-${
    user.id
  }`;

  // Llamar a la API route para subir el archivo
  await uploadFileToS3ViaAPI(buffer, fileName);

  const url = `https://kia-audios.s3.amazonaws.com/myfolder/${fileName}`;

  await prisma.audio.create({
    data: {
      url,
      userId: user.id,
    },
  });

  return url;
};
