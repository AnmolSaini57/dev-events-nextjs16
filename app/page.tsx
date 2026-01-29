import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getEvents } from "@/lib/actions/event.action";

const Home = async () => {
  const events = await getEvents();

  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Can&apos;t Miss!
      </h1>
      <p className="text-center mt-5">
        Hackathons, Conferences, and Meetups, All in One Place.
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7" id="events">
        <h3>Feature Events</h3>

        <ul className="events list-none">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
