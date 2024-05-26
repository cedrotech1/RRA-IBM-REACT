import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; 

const App = () => {
  const navigate = useNavigate();
  
  const initialFormData = {
    firstname: '',
    lastname: '',
    phone: '',
    tinnumber: '',
    nid: '',
    email: '',
    password: '',
    comfirmpassword: '',
    businessDescription: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'customer',
          status: 'active',
        }),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Reload the page after successful signup
        window.location.reload();
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
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 hero-text-image">
              <div className="row">
                <div className="col-lg-7 text-center text-lg-start">
                  <h1 data-aos="fade-right">SIGN UP HERE</h1>
                  <form onSubmit={handleSubmit} className="php-email-form">
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstname" className="form-control" id="firstname" onChange={handleChange} value={formData.firstname} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastname" className="form-control" id="lastname" onChange={handleChange} value={formData.lastname} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="phone">Telephone number</label>
                        <input type="text" name="phone" className="form-control" id="phone" onChange={handleChange} value={formData.phone} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="tinnumber">TIN number</label>
                        <input type="text" name="tinnumber" className="form-control" id="tinnumber" onChange={handleChange} value={formData.tinnumber} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="nid">National Identification number (NID)</label>
                        <input type="text" name="nid" className="form-control" id="nid" onChange={handleChange} value={formData.nid} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" id="email" onChange={handleChange} value={formData.email} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" onChange={handleChange} value={formData.password} required />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="comfirmpassword" className="form-control" id="confirmPassword" onChange={handleChange} value={formData.comfirmpassword} required />
                      </div>
                      <div className="col-md-12 form-group">
                        <label htmlFor="businessDescription">Business/Company Description</label>
                        <textarea className="form-control" name="businessDescription" id="businessDescription" onChange={handleChange} value={formData.businessDescription} required />
                      </div>
                    </div>
                    <br />
                    <div className='row'>
                      <div className="col-md-6 form-group">
                        <button type="submit" style={{color:'white',marginTop:'0.3cm'}} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
                          {loading ? 'loading...' : 'Create account'}
                        </button>
                      </div>
                      <div className="col-md-6 form-group">
                        <a href="login">
                          <input type="button" style={{color:'white',marginTop:'0.3cm'}} className="btn btn-info d-block w-100" value="Back to login" />
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-4 iphone-wrap p-10">
                  <img src="assets/img/RRA Logo.png" alt="Image" className="phone-1" data-aos="fade-right" style={{ width: '13cm', marginTop: '12cm' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default App;
