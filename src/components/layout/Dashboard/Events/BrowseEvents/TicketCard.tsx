/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react'
import { FcCalendar } from "react-icons/fc";
import { formatDate, formatTime } from "@/frontend/utils/Event";
import { FaLocationDot } from "react-icons/fa6";
import { FcClock } from "react-icons/fc";
export default function TicketCard({ event }: { event: any }) {
    const price = '$45.00';
    return (
        // Outer Wrapper with Dark Background and Shadow for the ticket look
        <div className={`col-span-1 flex justify-center  `}>
            {/* 1. Main Ticket Container */}
            <div className={`relative w-full p-3 max-w-sm overflow-hidden rounded-2xl z-10  border-2 border-primary hover:-translate-y-3 hover:rounded-tl-[10%] hover:rounded-br-[10%] hover:rounded-tr-none hover:rounded-bl-none transition-all duration-300 shadow-lg hover:shadow-2xl bg-background`}>

                {/* --- TICKET SHAPE EFFECT (The Semicircular Cutouts) --- */}
                {/* This is achieved by creating large, transparent (or background-colored) circles 
            that overlap the card's rounded corners. */}

                {/* Top-Left Notch: Large circle the color of the background */}
                <div className={`absolute top-19 left-0 w-17 h-16 -ml-8 bg-background  rounded-full z-30`} />

                {/* Top-Right Notch: Large circle the color of the background */}
                <div className={`absolute top-19 right-0 w-17 h-16 -mr-8 bg-background  rounded-full z-30`} />

                {/* 2. Image Section */}
                <div className="relative h-48 bg-black ">
                    {/* Use the actual image or Next/Image here */}
                    <Image
                        src={event.avatar?.url || '/events/defaultImgEvent.png'}
                        alt={`${event.name} avatar`}
                        className="w-full h-full object-cover opacity-90"
                        width={200}
                        height={150} 
                    />

                    {/* Inner Notch Fillers: These white semi-circles define the top curve of the image/black area */}
                    <div className="absolute inset-x-0 top-14 h-8 flex justify-between">
                        <div className={`w-17 h-20 -ml-8 rounded-full bg-background z-20 `}></div>
                        <div className={`w-17 h-20 -mr-8 rounded-full bg-background z-20`}></div>
                    </div>
                </div>

                {/* 3. Content Section (All text details) */}
                <div className={`px-2 pt-6 pb-2  space-y-4`}>

                    {/* Title */}
                    <h2 className="text-2xl  font-bold leading-none ">
                        {event.name}
                    </h2>

                    {/* Dashed Separator Line */}
                    <hr className="border-t border-dashed border-gray-400 my-4" />

                    {/* Date, Time, and Location Row */}

                    <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-inner border border-gray-200">

                        <h4 className="text-sm font-semibold uppercase  mb-3">Event Details</h4>

                        {/* Date and Time Row */}

                            {/* Date Column */}
                            <div className="flex items-start space-x-3 pt-2">
                            <FcCalendar className='size-9'/>
                                <div className="flex flex-col">
                                <span className="text-xs  uppercase">Date</span>
                                <span className="text-md font-bold ">{formatDate(event.eventDate)}</span>
                                </div>
                            </div>

                            {/* Time Column */}
                            <div className="flex items-start space-x-3 pt-2 ">
                            <FcClock className='size-9'/>
                                <div className="flex flex-col">
                                <span className="text-xs font-semibold uppercase">Time</span>
                                <span className="text-md font-bold ">{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                                </div>
                            </div>


                        {/* Location Detail */}
                        <div className="flex items-start space-x-3 pt-2">
                            <FaLocationDot className='size-9 text-foreground'/>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold uppercase">Location</span>
                                <p className="text-md line-clamp-1 font-bold ">
                                    {event.locate}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex ">

                        {/* View Details Button (Left Side) */}
                        <button className={`w-1/2 py-3 text-base font-semibold  transition duration-150 rounded-l-2xl border border-primary`}>
                            View Details
                        </button>

                        {/* Get Tickets Button with Price (Right Side) */}
                        <button className={`w-1/2 py-3 rounded-r-2xl  font-bold text-lg  bg-primary text-primary-foreground transition duration-150 flex flex-col justify-center items-center`}>
                            <span>Get Tickets</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
