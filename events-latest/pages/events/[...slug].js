import { useRouter } from "next/router";
import { getFilteredEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/events-search";
import ResultsTitle from "@/components/events/results-title";
import { Fragment } from "react";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

export default function AllEvents() {
  const router = useRouter();
  const filterData = router.query.slug;

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filterMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>;
        </ErrorAlert>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className="center">No events found for the chosen filter</p>;
        </ErrorAlert>
        <Button></Button>
      </Fragment>
    );
  }
  const titleDate = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={titleDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
