import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="detail-item flex flex-row gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item, index) => (
        <li key={index} className="agenda-item">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="tags flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag, index) => (
      <span key={index} className="pill">
        {tag}
      </span>
    ))}
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { event } = await response.json();
  event.bookings = 10; // For demo purposes

  if (!event) return notFound();

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
  {
    console.log(typeof similarEvents);
    console.log(similarEvents);
  }

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>

      <div className="details">
        {/* Left Side - Event Content */}
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="Calendar Icon"
              label={event.date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="Clock Icon"
              label={event.time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="Location Icon"
              label={event.location}
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              alt="Mode Icon"
              label={event.mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="Audience Icon"
              label={event.audience}
            />
          </section>

          <EventAgenda agendaItems={event.agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>

          <EventTags tags={event.tags} />
        </div>

        {/* Right Side - Booking Form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {event.bookings > 0 ? (
              <p className="text-sm">
                Join {event.bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to Book Your Spot!</p>
            )}

            <BookEvent />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard {...similarEvent} key={similarEvent.slug} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
