"use client";
import { EventProps } from "@/types/EventTypes";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import TicketCard from "../../../common/events/TicketCard";
import { useTranslations } from "next-intl";

export default function BrowseEvents({ events }: Readonly<EventProps>) {
  const t = useTranslations("Events.Browse");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const now = new Date();

  
  const filteredEvents = events
    .filter((event) => {
      const query = searchQuery.toLowerCase();
      return event.name.toLowerCase().includes(query);
    })
    .filter((event) => new Date(event.eventDate) >= now) // optional: remove past events
    .sort(
      (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );
  return (
    <section className="min-h-screen py-8 w-[85%] mx-auto flex flex-col gap-6">
      <h1 className="capitalize font-bold text-4xl text-center  text-foreground">
        {t("title")}
      </h1>
      <div className="w-full flex justify-end">
        <ButtonGroup>
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="outline" aria-label="Search">
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <TicketCard key={event._id} event={event} />
        ))}
      </div>
      {filteredEvents.length === 0 && (
        <div className="text-center w-full p-8 rounded-xl shadow-md text-muted-foreground border-2 border-primary">
          {t("noEvents")}
        </div>
      )}
    </section>
  );
}
