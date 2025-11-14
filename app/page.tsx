"use client";

import { useQuery } from "@tanstack/react-query";
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { Event } from "@/prisma/generated/client";

const Home = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });

  const events = response?.events || [];

  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev
        <br /> Event You Cant Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h1>Featured Events</h1>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : error ? (
          <p className="text-center text-red-500">Failed to load events</p>
        ) : (
          <ul className="events list-none">
            {events.map((event:Event ) => (
              <li className="decoration-none" key={event.id || event.title}>
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Home;
