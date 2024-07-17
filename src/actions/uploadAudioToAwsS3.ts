"use server";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION ?? "",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY ?? "",
  },
});

export const uploadFileToS3 = async (audioBuffer: Buffer, fileName: string) => {
  const params: PutObjectCommandInput = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
    Key: `myfolder/${fileName}`,
    Body: audioBuffer,
    ContentType: "audio/mpeg",
  };
  const command = new PutObjectCommand(params);
  try {
    const data = await s3.send(command);
    console.log("Successfully uploaded audio file:", data);
    return data.ServerSideEncryption;
  } catch (err) {
    console.error("Error uploading audio file:", err);
    throw err;
  }
};
