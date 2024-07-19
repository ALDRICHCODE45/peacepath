import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION ?? "",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_S3_SECRET_KEY ?? "",
  },
});

export async function POST(request: Request) {
  try {
    // Obtener el buffer de audio y el nombre del archivo desde el cuerpo de la solicitud
    const { audioBuffer, fileName }: { audioBuffer: Buffer; fileName: string } =
      await request.json();

    // Validar que los parámetros están presentes
    if (!audioBuffer || !fileName) {
      return NextResponse.json(
        { error: "Missing audioBuffer or fileName" },
        { status: 400 }
      );
    }

    // Configurar parámetros para el comando de S3
    const params: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `myfolder/${fileName}`,
      Body: audioBuffer,
      ContentType: "audio/mpeg",
    };

    // Crear y enviar el comando de S3
    const command = new PutObjectCommand(params);
    await s3.send(command);

    // Responder con éxito
    return NextResponse.json({ message: "Successfully uploaded audio file" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
