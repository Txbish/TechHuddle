import prisma from "@/lib/prisma";
import { Event } from "@/prisma/generated/client";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: { slug },
    });

    if (!event) return [];

    const similarEvents = await prisma.event.findMany({
      where: {
        id: { not: event.id },           // exclude current event
        tags: { hasSome: event.tags },   // any overlapping tag
      },
    });

    return similarEvents;
  } catch (error) {
    console.error(error);
    return [];
  }
};
