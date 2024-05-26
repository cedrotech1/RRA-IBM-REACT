import Menu from '../../components/menu';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';
import '../../components/style.css';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);


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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (claimId) => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/upload/${claimId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFile(null);
        // Optionally, refresh the claim details
        // fetchClaims();
      } else {
        toast.error(data.message || 'Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file.');
    }
  };

  const handleViewDownload = (id) => {
    navigate(`../download/${id}`);
  };

  const handleDelete = async (claimId) => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete this claim?');
      if (!isConfirmed) {
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/delete/${claimId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await navigate('../myclaim');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error deleting claim:', error);
    }
  };

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
              claims.map((claim) => (
                <div className="col-md-6" key={claim.id}>
                  <div className="step">
                    <span className="number">Claim number:#000{claim.id}</span>
                    <h3>{claim.title}</h3>
                    <p>{claim.description}</p>
                    <br />
                    <div className="row">
                      <div className="col-12">
                        <i>
                        {claim.status === 'approved' && (
                          <>
                          <p style={{backgroundColor:'lightgreen',color:'white',padding:'0.4cm',borderRadius:'0.3cm'}}>Congraturation you may now came to RRA-and check for further.........informaton</p><br/>
                          </>
                        )}
                        </i>
                      </div>
                      
                    </div>

                    {claim.status === 'checked' && (
                           <form>
                           <input type="file" className='form-control' onChange={handleFileChange} /><br/>
                           <button type="button" className="statusbtn" onClick={() => handleFileUpload(claim.id)}>Upload</button>
                         </form>
                        )}
                   
                    <div className="row">
                      <div className="col-12">
                        time and date of claim <br/>
                        <i>{claim.date} &nbsp; &nbsp;  <i>{claim.time}</i></i>
                      </div>
                     
                    </div>
                    <div className="row">
                      <div className="col-2"></div>
                      <div className="col-12">
                        <br />
                        {claim.status === 'checked' && (
                          <button onClick={() => handleViewDownload(claim.id)} className="deletebtn">
                            Click here to download
                          </button>
                        )}
                      </div>
                     

                          {claim.status === 'pending' && (<>
                        
                             <div className="col-4">
                        <i>
                          <br />
                          <button className="deletebtn" onClick={() => handleDelete(claim.id)}>
                          Delete
                        </button>
                        </i>
                      </div>
                        </>
                        )}
                          
                       
                    </div>
                  </div>
                </div>
              ))
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
