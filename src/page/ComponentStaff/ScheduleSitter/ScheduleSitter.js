import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import SitterService from "../../../config/service/SitterService";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import SchedulesEvent from "../../../lib/ModalInput/SchedulesEvent/SchedulesEvent";

const ScheduleSitter = () => {
    const [events, setEvents] = useState([
        // {
        //     title: "Sự kiện mẫu",
        //     start: "2023-06-07T10:00:00",
        //     end: "2023-06-08T12:00:00",
        // },
    ]);
    const [isShowInfo, setIsShowInfo] = useState(false);
    const [info, setInfo] = useState();

    useEffect(() => {
        SitterService.getSitterIdByUserId(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            if (res.sitterId) {
                SitterService.getSchedules(res.sitterId).then((res) => {
                    setEvents(res);
                });
            }
        });
    }, []);

    const handleDateClick = (arg) => {
        alert(arg.dateStr);
    };

    const handleClickEvent = (e) => {
        console.log(e);
        setInfo(e.event._def);
        setIsShowInfo(true);
    };

    const handleInputCustom = () => {
        setIsShowInfo(false);
    };

    const DivViewInfo = (
        <ModalInput
            show={isShowInfo}
            handleInputCustom={handleInputCustom}
            content={
                <SchedulesEvent
                    info={info}
                    handleInputCustom={handleInputCustom}
                />
            }
        />
    );

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
                    eventClick={handleClickEvent}
                />
            </div>
            {isShowInfo ? DivViewInfo : null}
        </div>
    );
};

export default ScheduleSitter;
