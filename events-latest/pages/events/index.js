import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/dummy-data";
import EventSearch from "@/components/events/events-search";
import { useRouter } from "next/router";

export default function Events() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </div>
  );
}
