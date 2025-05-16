import React from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { LectureData } from '@/types';

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => 1,
  getDay,
  locales,
});

const dayMap: Record<string, number> = {
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6,
};

function getEventDate(day: string, time: string) {
  // Always use the current week (Monday as start)
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const match = time.match(/(\d+):(\d+) (AM|PM)/i);
  if (!match) throw new Error(`Invalid time format: ${time}`);
  const [hour, min, ampm] = match.slice(1);
  let h = parseInt(hour, 10);
  if (ampm.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
  const d = new Date(monday);
  d.setDate(monday.getDate() + (dayMap[day] - 1));
  d.setHours(h, parseInt(min, 10), 0, 0);
  return d;
}

const getEvent = (lecture: LectureData) => {
  if (!lecture.day || !lecture.time) {
    console.warn('Lecture missing day or time:', lecture);
    return null;
  }
  try {
    const start = getEventDate(lecture.day, lecture.time);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour
    return {
      id: lecture._id,
      title: lecture.subject,
      start,
      end,
      resource: lecture,
    };
  } catch (e) {
    console.error('Error creating event for lecture:', lecture, e);
    return null;
  }
};

interface Props {
  lectures: LectureData[];
  selectedLectures: LectureData[];
  onLectureSelect: (lecture: LectureData) => void;
}

const StudentCalendarView: React.FC<Props> = ({ lectures, selectedLectures, onLectureSelect }) => {
  let events: any[] = [];
  try {
    events = lectures.map(getEvent).filter(Boolean);
  } catch (e) {
    console.error('Error mapping lectures to events:', e);
    return <div className="text-red-600 font-bold">Error loading timetable. Check console for details.</div>;
  }
  const selectedIds = new Set(selectedLectures.map(l => l._id));

  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        defaultDate={today}
        views={['week']}
        min={new Date(1970, 1, 1, 8, 0)}
        max={new Date(1970, 1, 1, 17, 0)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        dayLayoutAlgorithm="no-overlap"
        eventPropGetter={(event) => {
          const isSelected = selectedIds.has(event.id);
          return {
            style: {
              backgroundColor: isSelected ? '#22c55e' : '#3b82f6',
              color: 'white',
              border: isSelected ? '2px solid #16a34a' : 'none',
              cursor: 'pointer',
              fontWeight: 600,
            },
          };
        }}
        onSelectEvent={event => onLectureSelect(event.resource)}
        toolbar={true}
        timeslots={2}
        step={30}
        daysOfWeek={[1, 2, 3, 4, 5, 6]}
      />
    </div>
  );
};

export default StudentCalendarView; 