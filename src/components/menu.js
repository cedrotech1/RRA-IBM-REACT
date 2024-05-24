



import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <h1><a href="/admin_Home">RRA-CLAIM</a></h1>
            <a href="admin_Home"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li><a class="active " href="/customer">Home</a></li>
              <li><a href="/claim">claim</a></li>
              <li><a href="/myclaim">my claims</a></li>
              <li><a href="/logout">logout</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" onClick={() => setShowMenu(!showMenu)}></i>
          </nav>
        </div>
      </header>

      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><b style={{ textAlign: 'center' }}></b>
            <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <ul style={{ marginBottom: '1cm', listStyle: 'none', textAlign: 'center', fontFamily: 'cursive', fontSize: '0.5cm', marginBottom: '1cm' }}>
            <li><a class="active " href="/customer">Home</a></li>
            <li><a href="/claim">claim</a></li>
            <li><a href="/myclaim">my claims</a></li>
            <li><a href="/logout">logout</a></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default App;

