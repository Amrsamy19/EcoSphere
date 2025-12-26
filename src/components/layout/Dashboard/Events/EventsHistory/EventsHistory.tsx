import React from 'react'
import { useTranslations } from "next-intl";
import { EventProps } from "@/types/EventTypes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EventCard from '@/components/layout/common/events/EventCard';
export default function EventsHistory({ events }: EventProps) {
    const t = useTranslations("Events.displayEvents");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pastEvents = events.filter(
        (event) => new Date(event.eventDate) < today
    ).sort(
        (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );
    return (
        <div className="min-h-screen py-8 w-[85%] mx-auto flex flex-col gap-6">
            <h1 className="capitalize font-bold text-4xl text-center  text-foreground">
                {t("history")}
            </h1>

            {/* Past Events (END SECTION) */}
            {pastEvents.length > 0 ? (
                <section className="space-y-4  pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
                        {pastEvents.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                </section>
            ) : (
                <div className="text-center w-full p-8 rounded-xl shadow-md text-muted-foreground border-2 border-primary space-y-4">
                    <p>{t("nohistory")}</p>
                    <Button asChild className="capitalize">
                        <Link href="/organizer/manage">{t("addEventBtn")}</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
