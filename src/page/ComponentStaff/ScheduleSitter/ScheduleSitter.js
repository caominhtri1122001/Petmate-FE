import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const ScheduleSitter = () => {
    const [events, setEvents] = useState([
        {
            title: "Sự kiện mẫu",
            start: "2023-06-07T10:00:00",
            end: "2023-06-08T12:00:00",
        },
    ]);
    const handleDateClick = (arg) => {
        alert(arg.dateStr);
    };

    return (
        <div className="div-container" style={{ background: "#ffffff" }}>
            <div style={{ width: 1000 }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={events}
                />
            </div>
        </div>
    );
};

export default ScheduleSitter;
