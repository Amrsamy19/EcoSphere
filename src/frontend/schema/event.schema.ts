import * as z from "zod";

const createDateTime = (date: string, time: string) => {
    // Note: Concatenating date and time strings works for standard ISO format parsing
    return new Date(`${date}T${time}:00`);
};

export const subEventSchema = z.object({
  title: z.string().min(2, { message: "Section title is required." }),
  description: z.string().optional(),
  timeStart: z.string().min(1, { message: "Start time is required." }),
  timeEnd: z.string().min(1, { message: "End time is required." }),
});

export const eventSchema = z.object({
  eventName: z.string().min(2, { message: "Event name must be at least 2 characters." }),
  eventType: z.string({ message: "Please enter a valid Name." }),
  imageUrl: z.any().optional().refine((value) => {
    // Check if value is a FileList and has at least one file, or if it's an empty string (optional).
    return (value instanceof FileList && value.length > 0) || value === '' || typeof value === 'string';
  }, {
    message: "Image URL must be a valid file or an empty string.",
  }),
  description: z.string().optional(),
  location: z.string().min(2, { message: "Location is required." }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  timeStart: z.string(),
  timeEnd: z.string(),
  ticketsAmount: z.coerce.number<number>().min(0),
  ticketType: z.enum(["Priced", "Free"]),
  price: z.coerce.number<number>().min(0),
	subEvents: z.array(subEventSchema).optional(),
}).refine((data) => {
    // Skip validation if the subEvents array is empty or undefined
    if (!data.subEvents || data.subEvents.length === 0) {
        return true;
    }

    // 1. Calculate Main Event Boundaries
    const mainEventStart = createDateTime(data.date, data.timeStart);
    const mainEventEnd = createDateTime(data.date, data.timeEnd);
    
    // Check for general validity (should be caught by individual field validation, but good to check)
    if (isNaN(mainEventStart.getTime()) || isNaN(mainEventEnd.getTime())) {
        return true; 
    }
    
    // 2. Iterate through all Sub-Events and check against boundaries
    for (const subEvent of data.subEvents) {
        const subEventStart = createDateTime(data.date, subEvent.timeStart);
        const subEventEnd = createDateTime(data.date, subEvent.timeEnd);

        // a) Check if sub-event starts before the main event
        if (subEventStart.getTime() < mainEventStart.getTime()) {
            return false;
        }

        // b) Check if sub-event ends after the main event
        if (subEventEnd.getTime() > mainEventEnd.getTime()) {
            return false;
        }

        // c) (Bonus) Check if sub-event ends before it starts
        if (subEventEnd.getTime() <= subEventStart.getTime()) {
            return false; 
        }
    }

    return true; // All sub-events are within bounds
}, {
    // This message is applied to the whole form, but it's the only way to apply 
    // a global constraint message.
    message: "A schedule item is outside the main event's start and end times, or its end time is before its start time.",
    path: ["subEvents"], // Display error message near the subEvents section
});


