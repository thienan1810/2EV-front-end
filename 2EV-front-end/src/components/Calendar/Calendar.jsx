import React, { Component } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./calendar.css";
import Swal from "sweetalert2";

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, onChange }) => {
  const handleSwalSelect = ({ start, end }) => {
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2", "3"]
    })
      .queue(["Name", "Phone Number", "Desired Service"])
      .then(result => {
        if (result.value) {
          const [name, number, service] = result.value;
          onChange({
            start,
            end,
            title: service,
            name,
            number
          });
        }
      });
  };

  const handleView = event => {
    console.log("Event =>", event);
    Swal.fire(event.title);
  };

  // remapping date to standard format
  const mapToRBCFormat = e =>
    Object.assign({}, e, {
      title: e.title,
      start: new Date(e.start),
      end: new Date(e.end),
      name: e.name,
      number: e.number
    });

  return (
    <div style={{ width: "100%" }}>
      <Calendar
        events={events.map(mapToRBCFormat)}
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 18, 0, 0)}
        selectable
        dayLayoutAlgorithm="no-overlap"
        views={['week', 'day']}
        defaultView={Views.WEEK}
        defaultDate={moment().toDate()}
        localizer={localizer}
        onSelectEvent={event => handleView(event)}
        onSelectSlot={handleSwalSelect}
      />
    </div>
  );
};

export default CalendarComponent;
