import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [loggedIn, setLoggedIn] = useState(false);
//   const [email, setEmail] = useState('');
    const [Username, setUsername] = useState('');
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn');
    if (loggedInStatus) {
        setLoggedIn(true);
        // const loggedInEmail = localStorage.getItem('userEmail');
        // setEmail(loggedInEmail || ''); // Set the logged-in email or an empty string if not found
        const loggedInUsername = localStorage.getItem('username');
        setUsername(loggedInUsername || 'Na'); // Set the logged-in email or an empty string if not found
    }
}, []);

  const handleLogout = () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userEmail');
      setLoggedIn(false);
    //   setEmail('');
      window.location.href = '/';
  };

  return (
      <nav className="navbar">
          <div className="navbar-container">
              <div className="logo">
                  <Link to="/">
                      <img src="/path/to/your/logo.png" alt="Logo" />
                  </Link>
              </div>
              <div className="nav-links">
                  <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/DepartmentsPage">Departments</Link></li>
                      <li><Link to="/ShowDoctor">Doctors</Link></li>
                      <li><Link to="/ShowAppointment">My appointments</Link></li>
                      {loggedIn ? (
                          <>
                              <li><span>Welcome, {(Username)}!</span></li>
                              <li><button onClick={handleLogout}>Logout</button></li>
                          </>
                      ) : (
                          <>
                              <li><Link to="/Login">Login</Link></li>
                              <li><Link to="/Signup">Signup</Link></li>
                          </>
                      )}
                  </ul>
              </div>
          </div>
      </nav>
  );
};

export default AdminHome;
