import { getCurrentUser, requireAuth } from "@/backend/utils/authHelper";
import { IEventDetails } from "@/types/EventTypes";
import { rootContainer } from "@/backend/config/container";
import EventController from "@/backend/features/event/event.controller";

export async function GetAllEvents() {
    const res = await rootContainer.resolve(EventController).getEvents()
    if (!res) {
        throw new Error("error in fetch api response");
    }
    return res;
};
export async function GetAllUserEvents() {
    const user = await getCurrentUser();
    const res = await rootContainer.resolve(EventController).getEventsByUserId(user?.id!)
    if (!res) {
        throw new Error("error in fetch api response");
    }
    return res;
};
export async function PostEvent(data: Partial<IEventDetails>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data })
    });
    console.log(res);

    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};

export async function UpdateEvent({ data }: { data: Partial<IEventDetails> }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data })
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};

export async function DeleteEvent({ eventId }: { eventId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events/user/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId })
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};