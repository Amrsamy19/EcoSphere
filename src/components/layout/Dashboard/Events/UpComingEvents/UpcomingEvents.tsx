'use client'
import React, { useState } from 'react'
import { useTranslations } from "next-intl";
import { EventProps } from "@/types/EventTypes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EventCard from '@/components/layout/common/events/EventCard';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
export default function UpcomingEvents({ events }: EventProps) {
    const t = useTranslations("Events.displayEvents");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = events
        .filter((event) => new Date(event.eventDate) >= today)
        .filter((event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((event) => {
            if (priceFilter === "free") return event.ticketPrice === 0;
            if (priceFilter === "paid") return event.ticketPrice > 0;
            return true;
        })
        .sort(
            (a, b) =>
                new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    return (
        <div className="min-h-screen py-8 w-[85%] mx-auto flex flex-col gap-6">
            <h1 className="capitalize font-bold text-4xl text-center  text-foreground">
                {t("UpComingEvents")}
            </h1>
            <div className="flex flex-col gap-4 py-5">
                <div className="w-full gap-4 flex justify-center md:justify-end">
                    {/* Price Filter Select */}
                    <Select value={priceFilter} onValueChange={(value) => setPriceFilter(value as "all" | "free" | "paid")}>
                        <SelectTrigger className="w-full md:w-45">
                            <SelectValue placeholder={t("filterByPrice")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("all")}</SelectItem>
                            <SelectItem value="free">{t("free")}</SelectItem>
                            <SelectItem value="paid">{t("paid")}</SelectItem>
                        </SelectContent>
                    </Select>
                    <ButtonGroup className="rtl:flex-row-reverse w-[80%] md:w-fit">
                        <Input
                            placeholder={t("searchPlaceholder")}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button
                            aria-label={t("search")}
                            className="rounded-l-none border-l-0 px-3"
                        >
                            <SearchIcon className="h-4 w-4" />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 ? (
                <section className="space-y-4  pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                </section>
            ) : (
                <div className="text-center w-full p-8 rounded-xl shadow-md text-muted-foreground border-2 border-primary space-y-4">
                    <p>{t("noupcomingEvents")}</p>
                    <Button asChild className="capitalize">
                        <Link href="/organizer/manage">{t("addEventBtn")}</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
