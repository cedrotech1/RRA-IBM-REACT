import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <h1><a href="/employee_Home">RRA-CLAIM</a></h1>
            <a href="/employee_Home"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li><a className="active" href="/employee_Home">Home</a></li>
              <li><a href="/employee_claim">Claims</a></li>
              <li><a href="/settings">Settings</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" onClick={() => setShowMenu(!showMenu)}></i>
          </nav>
        </div>
      </header>

      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <b style={{ textAlign: 'center' }}></b>
            <a href="/employee_Home"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul style={{ marginBottom: '1cm', listStyle: 'none', textAlign: 'center', fontFamily: 'sans-serif', fontSize: '0.5cm' }}>
            <li><a className="active" href="/employee_Home">Home</a></li>
            <li><a href="/employee_claim">Claims</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default App;
