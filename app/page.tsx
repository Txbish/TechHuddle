import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";

const Home = () => {
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
        <ul className="events list-none">
          {events.map((event) => (
            <li className="decoration-none" key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
