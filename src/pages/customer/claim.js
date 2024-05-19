import Menu from '../../components/menu';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Claim/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        console.log(formData)
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
   <Menu/>
   <Hero title='claim' discription='make your claim and make check updates to every time to view claim updates !'/>

    


    <section class="section">
      <div class="container">
        <div class="row mb-5 align-items-end">
          <div class="col-md-6" data-aos="fade-up">

            <h2>make your claim</h2>
            <p class="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut officiis explicabo inventore.</p>
          </div>

        </div>

        <div class="row">
          <div class="col-md-5 ms-auto order-2" data-aos="fade-up">
         
<div class="col-lg-12 iphone-wrap">
          <img src="assets/img/RRA Logo.png" alt="Image" class="phone-1" data-aos="fade-right" style={{width:'100%'}}/>
          {/* <img src="assets/img/phone_2.png" alt="Image" class="phone-2" data-aos="fade-right" data-aos-delay="200"/> */}
        </div>

          </div>

          <div class="col-md-6 mb-5 mb-md-0" data-aos="fade-up">
            <form onSubmit={handleSubmit} class="php-email-form">

              <div class="row">
         
                <div class="col-md-12 form-group mt-3">
                  <label for="name">title</label>
                  <input type="text" class="form-control" name="title" id="subject" required onChange={handleChange}/>
                </div>
                <div class="col-md-12 form-group mt-3">
                  <label for="name">Message</label>
                  <textarea class="form-control" name="description" required onChange={handleChange}></textarea>
                </div> 

             

                <div class="col-md-6 form-group">
                <br/>
                <button type="submit" style={{color:'white'}} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Make claim'}
            </button>
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>

    <Footer/>
    <ToastContainer />
    </>
  );
}

export default App;
