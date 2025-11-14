import React from "react";
import { notFound } from "next/navigation";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";
import { Event } from "@/prisma/generated/client";
import EventDetailsClient from "./EventDetailsClient";

const EventDetails = async ({ params }: { params: Promise<string> }) => {
  "use cache";
  cacheLife("hours");
  const slug = await params;

  // Fetch the event data on the server side
  try {
    const res = await fetch(`http://localhost:3000/api/events/${slug}`, {
      next: { revalidate: 3600 }, // 1 hour
    });

    if (!res.ok) {
      return notFound();
    }

    const response = await res.json();
    const event: Event = response?.event;

    if (!event) return notFound();

    const similarEvents: Event[] = await getSimilarEventsBySlug(slug);

    return <EventDetailsClient event={event} similarEvents={similarEvents} />;
  } catch (error) {
    console.error("Error fetching event:", error);
    return notFound();
  }
};

export default EventDetails;
