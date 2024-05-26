import Menu from '../../components/admin';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';

import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loading';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PdfViewer from '../../components/viewer';


function App() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claims, setclaims] = useState();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [pdfUrl1, setpdfUrl1] = useState('');



  useEffect(() => {
    const fetchclaims = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/one/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          // if (!Array.isArray(data.data)) {
          //   data = [data.data];
          // }
          setclaims([data.data]);
          setpdfUrl1(data.data.file)
          console.log(data.data.file); // Log URL to check
       
        } else {
          console.error('Failed to fetch claims:', data.message);
        }

        // Set loading to false after fetching data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching claims:', error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchclaims();
  }, []);

  // 
  const handleunCheck = async (userId) => {
    // navigate(`../one/${id}`);

    try {
      const isConfirmed = window.confirm("Are you sure you want to check this claim?");
      if (!isConfirmed) {
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/uncheck/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed

        // window.location.reload();
        await navigate('../employee_claim');
      } else {
        const errorData = await response.json();
        // toast.error(res.message);
        // console.error(`Failed to approve user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleCheck = async (userId) => {
  

    try {
      const isConfirmed = window.confirm("Are you sure you want to check this claim?");
      if (!isConfirmed) {
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/check/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed

        // window.location.reload();
        await navigate('../employee_claim');
      } else {
        const errorData = await response.json();
        // toast.error(res.message);
        // console.error(`Failed to approve user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleApprove = async (userId) => {
    // navigate(`../one/${id}`);

    try {
      const isConfirmed = window.confirm("Are you sure you want to approve this claim?");
      if (!isConfirmed) {
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/approve/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed

        // window.location.reload();
        await navigate('../employee_claim');
      } else {
        const errorData = await response.json();
        console.error(`Failed to approve user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleReject = async (userId) => {
    // navigate(`../one/${id}`);


    try {
      const isConfirmed = window.confirm("Are you sure you want to reject this claim?");
      if (!isConfirmed) {
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/reject/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed

        // window.location.reload();
        await navigate('../employee_claim');
      } else {
        const errorData = await response.json();
        console.error(`Failed to approve user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  // console.log(claims)

  console.log(pdfUrl1);
  return (
    <>
      <Menu />
      <Hero title='Details of my claim' discription='details of this claim' />





      <section class="section">

        <div class="container">
          <div class="row justify-content-center text-center mb-5" data-aos="fade">
          </div>

          <div class="row">
            {loading ? (
              <LoadingSpinner />
            ) : (
              claims.map((claim) => (


                <div class="col-md-4" key={claim.id}>
                  <div class="step">
                    <span class="number">Claim number:#000{claim.id}</span>
                    <h3>{claim.title}</h3>
                    <p>{claim.description}</p>
                    <br />
                    <div className='row'>
                      <div className='col-4'>  <i><button className='statusbtn'>{claim.status}</button> </i></div>
                      <div className='col-4'> </div>
                      <div className='col-4'> <i></i> </div>


                    </div>
                    <div className='row'>
                      <div className='col-4'>  <i>{claim.date} </i></div>
                      <div className='col-4'> </div>
                      <div className='col-4'> <i>{claim.time} </i> </div>
                    </div>

                    <div className='row'>
                      <br />
                      {(() => {
  if (claim.status === 'pending' || claim.status === 'checked' ) {
    return (
      <>
      <div className='col-4'> 
      <br /><button onClick={() => handleCheck(claim.id)} className='approvebtn'>
            Check
          </button>
        </div>

           <div className='col-4'> 
           <br /> <button onClick={() => handleunCheck(claim.id)} className='deletebtn'>
            unheck
          </button>
        </div>
        </>
    );
  }
})()}
                     
                    


                      {(() => {
  if (claim.status === 'rib-approved'  || claim.status === 'approved'  || claim.status === 'rejected') {
    return (
      <>
      <div className='col-4'> 
      <br /><button onClick={() => handleApprove(claim.id)} className='approvebtn'>approve</button>
        </div>

           <div className='col-4'> 
           <br /> <button onClick={() => handleReject(claim.id)} className='deletebtn'>reject</button>
        </div>
        </>
    );
  }
})()}












                    
                    </div>
                  </div>
                </div>
              ))
            )}
             

             {loading ? (
  <LoadingSpinner />
) : (
  <>
    {claims.map((claim) => (
      <>
      </>


      // Your existing code for rendering claim details
    ))}
    
    {pdfUrl1 && (
      <div class="col-md-8">
        <PdfViewer pdfUrl={pdfUrl1} />
      </div>
    )}
  </>
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
