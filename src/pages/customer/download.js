import Menu from '../../components/menu';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import React, { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../components/loading';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const pdRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const [claims, setclaims] = useState();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

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
          console.log([data.data])
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

  const handleViewDownload = (id) => {
    navigate(`../one/${id}`);
  };


  console.log(claims)
  // const Download = (id) => {
  //   navigate(`../one/${id}`);
  // };


  const Download = () => {
    const input = pdRef.current;
    html2canvas(input).then((canvas) => {

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio); 
      pdf.save('claim.pdf');
    });



  };

  return (
    <>
      <Menu />
      {/* <Hero title='Details of my claim' discription='details of this claim' /> */}





      <section class="section">

        <div class="container">
          <div class="row justify-content-center text-center mb-5" data-aos="fade">
          </div>

          <div class="row">
            {loading ? (
              <LoadingSpinner />
            ) : (
              claims.map((claim) => (


                <div class="col-md-12" ref={pdRef} >
                  <div class="stepx" style={{padding:'2cm'}}>
                    <div class="col-lg-4 iphone-wrap">
                      <img src="../assets/img/RRA Logo.png" alt="Image" class="phone-1" data-aos="fade-right" style={{ height: '4cm', width: '5cm' }} />
                      {/* <img src="assets/img/phone_2.png" alt="Image" class="phone-2" data-aos="fade-right" data-aos-delay="200"/> */}
                    </div>
                    <br />
                    {/* <span class="number">Claim number:#000{claim.id}</span> */}
                    NAMES:{claim.ClaimsUser.firstname} &nbsp; {claim.ClaimsUser.lastname} <br />
                    EMAIL:{claim.ClaimsUser.email}<br />
                    PHONE:{claim.ClaimsUser.phone}<br />
                    TIN NUMBER:{claim.ClaimsUser.tinnumber}<br />
                    NATIONAL ID NUMBER:{claim.ClaimsUser.nid}<br />
                    BUSINESS DESCRIPTION:{claim.ClaimsUser.businessDescription}<br />
                    <div className='row'>
                      <div className='col-4'>DATE FOR CLAIM <i>{claim.date} &nbsp; {claim.time}  </i></div>

                    </div>
                    <center><h3><u>{claim.title}</u></h3></center><br /> <br />
                    <p>{claim.description}</p>
                    <br /> <br /> <br />

                    RIB STATION:......................................................<br />

DATE:...................................................................<br />
NAMES:...............................................................<br />
SIGNATURE AND STAMP:..................................<br />
                 

                  </div>
             
                </div>
              ))
            )}

          </div>
        </div>


      </section>
      <div className='row' style={{ margin: '1cm', marginTop: '-2cm' }}>
        <div className='col-1'>
        </div>
        <div className='col-4'> <i>
          <button className='approvebtn' onClick={Download}>click here to download</button> </i> </div>
        <div className='col-6'> <br />
        </div>

        {/* <div className='col-4'> 
                        </div> */}
      </div>



      {/* <Footer /> */}
      <ToastContainer />
    </>
  );
}

export default App;
