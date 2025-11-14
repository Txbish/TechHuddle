import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Convert form-data → plain object
    const event: any = Object.fromEntries(formData.entries());

    // --- Validate image early ---
    const file = formData.get("image") as File | null;
    if (!file)
      return NextResponse.json(
        { message: "Image file is required." },
        { status: 400 }
      );

    // --- Normalize date ---
    if (event.date) {
      event.date = new Date(event.date).toISOString();
    }

    // --- Upload to Cloudinary ---
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          }
        )
        .end(buffer);
    });

    event.image = uploadResult.secure_url;

    // --- Save to Prisma ---
    const createdEvent = await prisma.event.create({ data: event });

    return NextResponse.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
