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
        // Clear form data after successful submission
        setFormData({
          title: '',
          description: '',
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await navigate(`../myclaim`);
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
      <Menu />
      <Hero title='claim' discription='make your claim and make check updates to every time to view claim updates !' />

      <section className="section">
        <div className="container">
          <div className="row mb-5 align-items-end">
            <div className="col-md-6" data-aos="fade-up">
              <h2>make your claim</h2>
              <p className="mb-0">
                Make your claim in few word and explain in details but in few words, after submiting your claim ! check your email,
                your claim acceped
                
                </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5 ms-auto order-2" data-aos="fade-up">
              <div className="col-lg-12 iphone-wrap">
                <img src="assets/img/RRA Logo.png" alt="Image" className="phone-1" data-aos="fade-right" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="col-md-6 mb-5 mb-md-0" data-aos="fade-up">
              <form onSubmit={handleSubmit} className="php-email-form">
                <div className="row">
                  <div className="col-md-12 form-group mt-3">
                    <label htmlFor="name">claim title</label>
                    <select name="title" className="form-control" id="subject" required onChange={handleChange}>
                    <option value=''>Choose your claim...............</option>
                      <option value='EBM lost'>EBM lost</option>
                      <option value='Technical issues'>Technical issues </option>
                      <option value='requesting Deregistration of EBM '>requesting Deregistration of EBM   </option>
                    </select>
                    {/* <input type="text" className="form-control" name="title" id="subject" required onChange={handleChange} value={formData.title} /> */}
                  </div>
                  <div className="col-md-12 form-group mt-3">
                    <label htmlFor="name">Descripe in details your claim</label>
                    <textarea className="form-control" name="description" required onChange={handleChange} value={formData.description}></textarea>
                  </div>

                  <div className="col-md-6 form-group">
                    <br />
                    <button type="submit" style={{ color: 'white' }} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
                      {loading ? <LoadingSpinner /> : 'Make claim'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
