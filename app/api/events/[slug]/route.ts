import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Event } from "@/prisma/generated/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }
    const normalzedSlug=slug.trim().toLowerCase();
    const event:Event= await prisma.event.findUnique({
      where: { slug:normalzedSlug }, // Prisma expects a unique field
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message:"Event found Successfully",event },{status:200});
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch event", error: error.message },
      { status: 500 }
    );
  }
}
