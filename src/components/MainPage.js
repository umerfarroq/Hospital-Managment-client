import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './styles/MainPage.css';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MainPage = () => {
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    phone: '',
    email: '',
    dob: '',
    diseaseType: '',
  });
  const [appointments, setAppointments] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.post(`http://localhost:5000/appointments/update/${newAppointment._id}`, newAppointment);
        // Update the appointment in state if needed
      } else {
        const response = await axios.post('http://localhost:5000/appointments/add', newAppointment);
        setAppointments([...appointments, response.data]);
      }
      setNewAppointment({ patientName: '', doctorName: '', date: '', phone: '', email: '', dob: '', diseaseType: '' });
      setIsEditMode(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleEditClick = (appointment) => {
  //   setNewAppointment(appointment);
  //   setIsEditMode(true);
  // };

  return (
    <div className="main-page">
      <Navbar />
      <div className="main-content">
        <div className="main-text">
          <h1>We Care for Your Health Every Moment</h1>
          <p>If you are looking at blank cassettes on the web, you may be very confused at the difference in price. You may see some for as low as $2 each.</p>
          <Link to="/appointments" className="appointment-button">
            Book an Appointment
          </Link>
        </div>
      </div>
      
      <div className="services">
        <h2>Services We Offer</h2>
        <div className="service-row">
          <div className="service-column">
          <FontAwesomeIcon icon="fa-solid fa-rocket" />
            <h3>24/7 Emergency</h3>
            <p>Our hospital offers round-the-clock emergency services to ensure you get the care you need at any time.</p>
          </div>
          <div className="service-column">
            <img src="/path/to/expert-consultation-icon.png" alt="Expert Consultation Icon" />
            <h3>Expert Consultation</h3>
            <p>Consult with our team of experienced doctors and specialists for personalized medical advice and treatment plans.</p>
          </div>
          <div className="service-column">
            <img src="/path/to/intensive-care-icon.png" alt="Intensive Care Icon" />
            <h3>Intensive Care</h3>
            <p>We provide advanced intensive care services for patients requiring specialized medical attention and monitoring.</p>
          </div>
          <div className="service-column">
            <img src="/path/to/family-planning-icon.png" alt="Family Planning Icon" />
            <h3>Family Planning</h3>
            <p>Our family planning services help you make informed decisions about contraception and reproductive health.</p>
          </div>
        </div>
      </div>
      <div className="service-hours-form">
        <div className="service-hours">
          <h2>Service Hours</h2>
          <ul>
            <li>
              <span>Monday:</span>
              <span>8:00 AM - 8:00 PM</span>
            </li>
            <li>
              <span>Tuesday:</span>
              <span>8:00 AM - 8:00 PM</span>
            </li>
            <li>
              <span>Wednesday:</span>
              <span>8:00 AM - 8:00 PM</span>
            </li>
            <li>
              <span>Thursday:</span>
              <span>8:00 AM - 8:00 PM</span>
            </li>
            <li>
              <span>Friday:</span>
              <span>8:00 AM - 8:00 PM</span>
            </li>
            <li>
              <span>Saturday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </li>
            <li>
              <span>Sunday:</span>
              <span>Closed</span>
            </li>
          </ul>
        </div>

        <div className="book-appointment">
          <h2>{isEditMode ? 'Edit Appointment' : 'Book an Appointment'}</h2>
          <form onSubmit={handleFormSubmit}>
            <input type="hidden" name="_id" value={newAppointment._id || ''} />
            <input type="text" name="patientName" placeholder="Patient Name" value={newAppointment.patientName} onChange={handleInputChange} required />
            <input type="text" name="doctorName" placeholder="Doctor Name" value={newAppointment.doctorName} onChange={handleInputChange} required />
            <label htmlFor="date">Appointment Date:</label>
            <input type="date" name="date" placeholder="Date" value={newAppointment.date} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone" value={newAppointment.phone} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={newAppointment.email} onChange={handleInputChange} required />
            <label htmlFor="date">Date of Birth:</label>
            <input type="date" name="dob" placeholder="Date of Birth" value={newAppointment.dob} onChange={handleInputChange} required />
            <input type="text" name="diseaseType" placeholder="Disease Type" value={newAppointment.diseaseType} onChange={handleInputChange} required />
            <button type="submit">{isEditMode ? 'Update Appointment' : 'Confirm Booking'}</button>
          </form>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default MainPage;
