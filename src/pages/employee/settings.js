import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/employee';
import Footer from '../../components/footer';
import Hero from '../../components/samplehero';
import LoadingSpinner from '../../components/loading';

function App() {
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/changePassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);

       
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Add navigation or additional handling here if needed
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error changing password', error);
      toast.error('Failed to change password. Please try again later.');
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
      <Hero title="Change Password" description="Change your password securely" />

      <section className="section">
        <div className="container">
          <div className="row mb-5 align-items-end">
            <div className="col-md-6" data-aos="fade-up">
              <h2>Change Password Form</h2>
              <p className="mb-0">
                Ensure your password is secure and updated. Check your email after submitting your new password.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5 ms-auto order-2" data-aos="fade-up">
              <div className="col-lg-12 iphone-wrap">
                <img src="assets/img/RRA Logo.png" alt="RRA Logo" className="phone-1" data-aos="fade-right" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="col-md-6 mb-5 mb-md-0" data-aos="fade-up">
              <form onSubmit={handleSubmit} className="php-email-form">
                <div className="row">
                  <div className="col-md-12 form-group" style={{ marginTop: '0.5cm', marginBottom: '0.5cm' }}>
                    <label htmlFor="oldPassword">Old Password</label><br />
                    <input
                      type="password"
                      name="oldPassword"
                      className="form-control"
                      id="oldPassword"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12 form-group" style={{ marginTop: '0.5cm', marginBottom: '0.5cm' }}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      className="form-control"
                      id="newPassword"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12 form-group" style={{ marginTop: '0.5cm', marginBottom: '0.5cm' }}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      id="confirmPassword"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <a href="reset" style={{ color: 'white' }}>Forgot Password?</a>

                  <div className="col-md-12 mb-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                  </div>

                  <div className="col-md-6 form-group">
                    <button type="submit" style={{ color: 'white', marginTop: '0.3cm' }} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
                      {loading ? 'Loading...' : 'Change Password'}
                    </button>
                  </div>
                  <div className="col-md-6 form-group">
                    <a href="employee_claim">
                      <input type="button" style={{ color: 'white', marginTop: '0.3cm' }} className="btn btn-info d-block w-100" value="Back to Claim" />
                    </a>
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
