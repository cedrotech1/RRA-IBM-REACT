import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '../../components/employee';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';
import LoadingSpinner from '../../components/loading';
import PdfViewer from '../../components/viewer';

function App() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfUrl1, setPdfUrl1] = useState('');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/one/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setClaims([data.data]);
          setPdfUrl1(data.data.file.replace('http://', 'https://'));
        } else {
          console.error('Failed to fetch claims:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching claims:', error);
        setLoading(false);
      }
    };

    fetchClaims();
  }, [id]);

  const handleAction = async (action, userId) => {
    const actions = {
      approve: "approve",
      reject: "reject",
      check: "check",
      uncheck: "uncheck"
    };

    const isConfirmed = window.confirm(`Are you sure you want to ${actions[action]} this claim?`);
    if (!isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/${action}/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('../employee_claim');
      } else {
        const errorData = await response.json();
        console.error(`Failed to ${actions[action]} user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error(`Error during ${actions[action]}:`, error);
    }
  };
  console.log(claims)

  return (
    <>
      <Menu />
      <Hero title='Details of my claim' discription='details of this claim' />
      <section className="section">
        <div className="container">
          <div className="row justify-content-center text-center mb-5" data-aos="fade"></div>
          <div className="row">
            {loading ? (
              <LoadingSpinner />
            ) : (
              claims.map(claim => (
                <div className="col-md-4" key={claim.id}>
                  <div className="step">
                    <span className="number">Claim number:#000{claim.id}</span>
                    NAMES:{claim.ClaimsUser.firstname} &nbsp; {claim.ClaimsUser.lastname} <br />
                    EMAIL:{claim.ClaimsUser.email}<br />
                    PHONE:{claim.ClaimsUser.phone}<br />
                    TIN NUMBER:{claim.ClaimsUser.tinnumber}<br />
                    NATIONAL ID NUMBER:{claim.ClaimsUser.nid}<br />
                    <h3>{claim.title}</h3>
                    <p>{claim.description}</p>
                    <div className="row">
                      <div className="col-4"><button className="statusbtn">{claim.status}</button></div>
                      <div className="col-4"></div>
                      <div className="col-4"></div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        time and date of claim <br />
                        <i>{claim.date} &nbsp; &nbsp;  <i>{claim.time}</i></i>
                      </div>

                    </div>
                    <br/>
                    <div className="row">
                      {claim.status === 'pending' || claim.status === 'checked' ? (
                        <>
                          <div className="col-4">
                            <button onClick={() => handleAction('check', claim.id)} className="approvebtn">Check</button>
                          </div>
                          <div className="col-4">
                            <button onClick={() => handleAction('uncheck', claim.id)} className="deletebtn">Uncheck</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-4">
                            <button onClick={() => handleAction('approve', claim.id)} className="approvebtn">Approve</button>
                          </div>
                          <div className="col-4">
                            <button onClick={() => handleAction('reject', claim.id)} className="deletebtn">Reject</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            {pdfUrl1 && (
              <div className="col-md-8">
                <PdfViewer pdfUrl={pdfUrl1} />
              </div>
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
