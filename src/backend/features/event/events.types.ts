import { ISubEvent } from "@/types/EventTypes";
import { IEvent } from "./event.model";

export type EventResponse = {
  _id: string;
  name: string;
  type: string;
  avatar?: { url?: string; key: string };
  description?: string;
  locate: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  capacity: number;
  ticketPrice: number;
  sections?: ISubEvent[];
  attenders?: string[];
  isAccepted: boolean;
  isEventNew: boolean;
  user?: string;
};

export const mapEventToEventData = (event: IEvent): EventResponse => {
  return {
    _id: event._id.toString(),
    name: event.name,
    type: event.type,
    avatar: JSON.parse(JSON.stringify(event.avatar)),
    description: event.description,
    locate: event.locate,
    eventDate: event.eventDate.toISOString(),
    startTime: event.startTime,
    endTime: event.endTime,
    capacity: event.capacity,
    ticketPrice: event.ticketPrice,
    sections: event.sections,
    attenders: event.attenders?.map(String),
    isAccepted: event.isAccepted,
    isEventNew: event.isEventNew,
    user: event.owner,
  };
};
