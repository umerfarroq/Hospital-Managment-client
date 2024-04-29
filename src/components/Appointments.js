import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentCard from './AppointmentCard';
import Navbar from './Navbar';
import './styles/Appointment.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    phone: '',
    email: '',
    dob: '',
    diseaseType: '',
  });
  // const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    refreshAppointments();
  }, []);

  const refreshAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: name === 'dob' ? value.slice(0, 10) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.post(`http://localhost:5000/appointments/update/${newAppointment._id}`, newAppointment);
      } else {
        const response = await axios.post('http://localhost:5000/appointments/add', newAppointment);
        setAppointments([...appointments, response.data]);
      }
      setNewAppointment({ patientName: '', doctorName: '', date: '', phone: '', email: '', dob: '', diseaseType: '' });
      setIsEditMode(false);
      refreshAppointments(); // Refresh appointments list after form submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditAppointment = (appointment) => {
    // setSelectedAppointment(appointment);
    setIsEditMode(true);
    setNewAppointment({
      ...appointment,
      date: appointment.date ? appointment.date.slice(0, 10) : '',
      dob: appointment.dob ? appointment.dob.slice(0, 10) : '',
    });
  };

  const handleDeleteAppointment = (id) => {
    axios.delete(`http://localhost:5000/appointments/delete/${id}`)
      .then(response => {
        console.log(response.data);
        setAppointments(appointments.filter(appointment => appointment._id !== id));
        refreshAppointments(); // Refresh appointments list after deletion
      })
      .catch(error => console.error('Error deleting appointment:', error));
  };

  return (
    <div>
      <Navbar />
      <div className='flex-row' style={{ width: "100%" }}>
        <div className='flex-column'>
          <div className='add-form'>
            <h4>{isEditMode ? 'Edit Appointment' : 'Add New Appointment'}</h4>
            <form className="appointment-form" onSubmit={handleFormSubmit}>
              <input type="hidden" name="_id" value={newAppointment._id || ''} />
              <input type="text" name="patientName" placeholder="Patient Name" value={newAppointment.patientName} onChange={handleInputChange} required />
              <input type="text" name="doctorName" placeholder="Doctor Name" value={newAppointment.doctorName} onChange={handleInputChange} required />
              <input type="date" name="date" placeholder="Date" value={newAppointment.date} onChange={handleInputChange} required />
              <input type="tel" name="phone" placeholder="Phone" value={newAppointment.phone} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={newAppointment.email} onChange={handleInputChange} required />
              <input type="date" name="dob" placeholder="Date of Birth" value={newAppointment.dob} onChange={handleInputChange} required />
              <input type="text" name="diseaseType" placeholder="Disease Type" value={newAppointment.diseaseType} onChange={handleInputChange} required />
              <button type="submit">{isEditMode ? 'Update Appointment' : 'Confirm Booking'}</button>
            </form>
          </div>
        </div>
        <div className='appointments'>
          <h3>Appointments ({appointments.length})</h3>
          <div className="appointment-list">
            {appointments.map(appointment => (
              <AppointmentCard key={appointment._id} appointment={appointment} onEdit={handleEditAppointment} onDelete={handleDeleteAppointment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
