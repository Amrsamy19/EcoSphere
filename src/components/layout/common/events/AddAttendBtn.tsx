import React from "react";

export default function AddAttendBtn() {
    const handleAddEvent = () => {

    }
    return (
        <button
            onClick={handleAddEvent}
            className="flex-1 py-3 capitalize rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition">
            Attend Event
        </button>
    );
}
