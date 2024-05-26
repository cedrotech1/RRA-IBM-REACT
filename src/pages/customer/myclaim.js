import Menu from '../../components/menu';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';

import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loading';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const [claims, setclaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchclaims = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setclaims(data.data);
        } else {
          console.error('Failed to fetch claims:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching claims:', error);
        setLoading(false);
      }
    };

    fetchclaims();
  }, []);

  const handleView = (id) => {
    navigate(`../one/${id}`);
  };

  return (
    <>
      <Menu />
      <Hero title='My claims' description='my all claims and status for each' />
      <section className="section">
        <div className="container">
          <div className="row justify-content-center text-center mb-5" data-aos="fade">
          </div>
          <div className="row">
            {loading ? (
              <LoadingSpinner />
            ) : (
              claims.length > 0 ? (
                claims.map((claim) => (
                  <div className="col-md-4"  key={claim.id}>
                    <br/>
                    <div className="step">
                      <span className="number">Claim number:#000{claim.id}</span>
                      <h3>{claim.title}</h3>
                      <p>{claim.description}</p>
                      <br />
                      <div className="row">
                        <div className="col-4" > 
                          <i><button className="statusbtn">{claim.status}</button></i>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-4">
                          <i><button className="approvebtn" onClick={() => handleView(claim.id)}>view</button></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4"><i>{claim.date}</i></div>
                        <div className="col-4"></div>
                        <div className="col-4"><i>{claim.time}</i></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <center>
                <img src="assets/img/data.jpg" alt="Image" class="phone-1" data-aos="fade-right" style={{height:'3cm',width:'3cm'}}/>
              </center>)
            )}
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
