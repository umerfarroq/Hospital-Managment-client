import React from 'react';
import './styles/AppointmentCard.css';

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="appointment-card">
      <div className="card-header">
        <h3>Appointment Details</h3>
      </div>
      <div className="card-body">
        <p><strong>Email:</strong> {appointment.email}</p>
        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
        {/* Add more details here as needed */}
      </div>
    </div>
  );
};

export default AppointmentCard;
