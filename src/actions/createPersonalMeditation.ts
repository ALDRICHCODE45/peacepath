"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OpenAI } from "openai";
import { generateId } from "ai";
import prisma from "@/app/lib/db";
import { PROMPT } from "@/app/dashboard/meditation/prompt";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Message {
  text: string;
}

interface DBUser {
  messages: Message[];
}
export interface Error {
  message: string;
}
interface Response {
  url?: string | null;
  error?: Error | null;
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

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION ?? "",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_S3_SECRET_KEY ?? "",
  },
});

export const createPersonalMeditation = async (): Promise<Response> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      url: null,
      error: {
        message: "user session not found",
      },
    };
  }

  const dbUser = await getUserData(user.id);

  if (!dbUser) {
    return {
      url: null,
      error: {
        message: "user not found in Db",
      },
    };
  }
  if (dbUser.messages.length < 3) {
    return {
      url: null,
      error: {
        message: "you dont have enough messages with kai",
      },
    };
  }
  try {
    const userInfo = dbUser.messages.map((msg) => msg.text).join(". ") + ".";
    const generatedText = await generatePromptResponse(userInfo);
    const buffer = await generateAudio(generatedText);

    const fileName = `personal_meditation-${user.given_name}-${generateId()}-${
      user.id
    }`;

    const params: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `myfolder/${fileName}`,
      Body: buffer,
      ContentType: "audio/mpeg",
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const url = `https://kia-audios.s3.amazonaws.com/myfolder/${fileName}`;

    await prisma.audio.create({
      data: {
        url,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/meditation");
    return {
      url,
      error: null,
    };
  } catch (e) {
    /* handle error */
    return {
      url: null,
      error: {
        message: "something went wrong",
      },
    };
  }
};
