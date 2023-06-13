import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "@/dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";

export default function SpecificEvent() {
  const router = useRouter();
  const eventid = router.query.eventid;
  const event = getEventById(eventid);

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Event was not found</p>;
        </ErrorAlert>
        <Button>All Events</Button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        alt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
