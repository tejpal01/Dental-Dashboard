import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

const CalendarPage = () => {
  const { incidents, patients } = useContext(DataContext);
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleClick = (day) => {
    const selected = new Date(year, month, day);
    const formatted = selected.toISOString().split('T')[0]; // YYYY-MM-DD
    setSelectedDate(formatted);
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`e${i}`} className="empty-day" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day).toISOString().split('T')[0];
      const hasAppointments = incidents.some(i => i.appointmentDate.startsWith(currentDate));

      days.push(
        <div
          key={day}
          className={`calendar-day ${hasAppointments ? 'has-data' : ''}`}
          onClick={() => handleClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const selectedIncidents = selectedDate
    ? incidents.filter(i => i.appointmentDate.startsWith(selectedDate))
    : [];

  return (
    <div className="page-container">
      <h2>Appointment Calendar - {today.toLocaleString('default', { month: 'long' })} {year}</h2>
      <div className="calendar-grid">{renderCalendar()}</div>

      {selectedDate && (
        <div>
          <h3>Appointments on {selectedDate}</h3>
          {selectedIncidents.length > 0 ? (
            <ul>
              {selectedIncidents.map(i => (
                <li key={i.id}>
                  {new Date(i.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                  {i.title} ({patients.find(p => p.id === i.patientId)?.name || 'Unknown'})
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
