export const EVENT_TYPES = [
  'Music Festival', 'Conference', 'Workshop', 'Sporting Event',
  'Exhibition', 'Private Party', 'Other'
];

export interface ISubEvent {
    title: string;
    description?: string;
    timeStart: string;
    timeEnd: string;
}

export interface IEventDetails {
    eventName: string;
    eventType: string;
    imageUrl?: string | FileList;
    description?: string;
    location: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    ticketsAmount: number;
    ticketType: "Priced" | "Free";
    price: number;
    subEvents?: ISubEvent[];
}


