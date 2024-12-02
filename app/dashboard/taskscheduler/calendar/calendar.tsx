'use client';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

const Calendar: React.FC = () => {
  // Sample events data
  const events: EventInput[] = [
    { title: 'Event 1', start: '2024-11-10' },
    { title: 'Event 2', start: '2024-11-15', end: '2024-11-17' },
    { title: 'Event 3', start: '2024-11-20', allDay: true }
  ];

  return (
    <div className="overscroll-y-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        editable={true}
        selectable={true}
        dayMaxEvents={true} // allow "more" link when too many events
      />
    </div>
  );
};

export default Calendar;
