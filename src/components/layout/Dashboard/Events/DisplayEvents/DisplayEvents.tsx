import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { EventProps, IEventDetails, ISubEvent } from "@/types/EventTypes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import DeleteEventBtn from "./DeleteEventBtn";
import UpdateEventBtn from "./UpdateEventBtn";
import { formatDate, formatTime } from "@/frontend/utils/Event";


export default function DisplayEvents({ events }: EventProps) {
  const t = useTranslations("Dashboard.displayEvents");
  return (
    <div className="min-h-screen py-8 w-[85%] mx-auto flex flex-col gap-6">
      <h1 className="capitalize font-bold text-4xl  text-foreground">
        {t("title")}
      </h1>
      {events.map((event) => (
        <div
          key={event._id}
          className=" my-2 border-2 border-primary shadow-xl rounded-tl-4xl rounded-br-4xl overflow-hidden transform hover:scale-[1.01] transition duration-300 relative"
        >
          {/* --- Action Buttons (Icon-only, Top Right) --- */}
          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            <Tooltip>
              <TooltipTrigger asChild >
                <UpdateEventBtn event={event}/>
              </TooltipTrigger>
              <TooltipContent >
                <p>Edit Event</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DeleteEventBtn id={event._id}/>
              </TooltipTrigger>
              <TooltipContent >
                <p>Delete Event</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* --- Main Content: Left Column (Image) & Right Column (Data) --- */}
          <div className="grid grid-cols-4 p-5">

            {/* --- Image/Avatar Section (Left Column) --- */}
            <div className="col-span-1 overflow-hidden rounded-tl-xl sm:rounded-tl-xl  bg-gray-100 flex items-center justify-center">
              <Image
                src={event.avatar?.url || '/events/defaultImgEvent.png'}
                alt={`${event.name} avatar`}
                className="w-full h-full object-cover"
                width={300} 
                height={300} 
              />
            </div>

            {/* --- Data Section (Right Column) --- */}
            <div className="col-span-3 flex flex-col justify-center  w-[90%] mx-auto">

              {/* Header Section (Name & Type - Adjusted to remove Avatar) */}
              <div className="mb-4 border-b pb-4">
                <h2 className="text-3xl font-extrabold ">
                  {event.name}
                </h2>
                <p className="text-sm font-medium text-primary-foreground uppercase tracking-wider">
                  {event.type}
                </p>
              </div>

              {/* Date, Time, and Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm  mb-6">
                <div className="flex items-center space-x-2">
                  <FaCalendar className="w-6 size-5 mr-2 items-baseline text-accent-foreground" />
                  <p className="font-semibold">{formatDate(event.eventDate)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MdAccessTime className="w-6 size-5 mr-2 items-baseline text-accent-foreground" />
                  <p>
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaLocationDot className="w-6 size-5 mr-2 items-baseline text-accent-foreground" />
                  <p>{event.locate}</p>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Details
                  </h3>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              )}

              {/* Pricing and Capacity */}
              <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ticket Type</p>
                  <p
                    className={`text-lg font-bold ${event.ticketPrice === 0
                      ? "text-gray-800"
                      : "text-foreground"
                      }`}
                  >
                    {event.ticketPrice === 0 ? "Free" : "Priced"}
                  </p>
                </div>
                {event.ticketPrice !== 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Price</p>
                    <p className="text-lg font-bold">
                      {event.ticketPrice.toFixed(2)} EGY
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Capacity</p>
                  <p className="text-lg font-bold ">
                    {event.capacity} people
                  </p>
                </div>
              </div>

              {/* Sub-Events/Sections */}
              {event.sections && event.sections.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 border-t pt-4">
                    Schedule
                  </h3>
                  <div className="space-y-4">
                    {event?.sections?.map((section, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50/50"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-gray-800">
                            {section.title}
                          </h4>
                          <p className="text-xs text-gray-500 font-medium">
                            {formatTime(section.startTime)} -{" "}
                            {formatTime(section.endTime)}
                          </p>
                        </div>
                        {section.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {section.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
