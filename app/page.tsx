import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { events, EventType } from "@/lib/constants";

function Home() {
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Can't Miss!
      </h1>
      <p className="text-center mt-5">
        Hackathons, Conferences, and Meetups, All in One Place.
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Feature Events</h3>

        <ul className="events list-none">
          {events.map((event: EventType) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Home;
