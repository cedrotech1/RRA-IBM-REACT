// import './App.css';
import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,useParams} from 'react-router-dom';
// import LoadingSpinner from '../../components/loading'; 

import 'react-toastify/dist/ReactToastify.css'
function App() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [formData, setFormData] = useState({
    code: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/code/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        await navigate(`../resetPassword/${email}`);

      
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error creating account', error);
      toast.error('Failed to create account. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>

      <section class="hero-section">

      <div class="container">
          <div class="row align-items-center" style={{marginTop:'-5cm'}}>
            <div class="col-12 hero-text-image">
              <div class="row" >
                <div class="col-lg-7 text-center text-lg-start">
                  <h1 data-aos="fade-right">ENTER YOUR EMAIL</h1>

                  <form onSubmit={handleSubmit}  class="php-email-form">

                    <div class="row">
                      <div class="col-md-12 form-group">
                        <label for="name">CODE</label>
                        <input type="number" name="code" class="form-control" id="code" required  onChange={handleChange}/>
                      </div>
                    
               
                   

                      <div class="col-md-12 form-group">
                      <br/> <button type="submit" style={{color:'white'}} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? 'loading....': 'get code'}
            </button>
                      </div>
                     
                    </div>

                  </form>

                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-4 iphone-wrap p-10">
                  {/* <img src="./assets/img/RRA Logo.png" alt="Image" class="phone-1" data-aos="fade-right" style={{ width: '13cm',marginTop:'5cm' }} /> */}
                  {/* <img src="assets/img/phone_2.png" alt="Image" class="phone-2" data-aos="fade-right" data-aos-delay="200"/> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      {/* <!-- End Hero --> */}
      <ToastContainer />




    </>
  );
}

export default App;
