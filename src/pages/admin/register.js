import React, { useState } from 'react';
import Menu from '../../components/admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading';

const App = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    role: 'employee',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/add`, {
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
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          role: 'employee',
        });
        // Optionally navigate to another page, e.g., navigate('/login');
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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Menu />
      <section className="hero-section" style={{ height: '100vh' }}>
        <div className="container" style={{ height: '100vh' }}>
          <div className="row align-items-center">
            <div className="col-12 hero-text-image">
              <div className="row">
                <div className="col-lg-7 text-center text-lg-start">
                  <h1 data-aos="fade-right">ADD EMPLOYEE HERE</h1>
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
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" id="email" onChange={handleChange} value={formData.email} required />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <button type="submit" style={{ color: 'white' }} className={`btn btn-primary d-block w-100 ${loading ? 'loading' : ''}`} disabled={loading}>
                          {loading ? 'loading....' : 'add employee'}
                        </button>
                      </div>
                      <div className="col-md-6 form-group">
                        <a href="admin_Employee_List">
                          <input type="button" className="btn btn-info d-block w-100" value="Back to view" />
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-4 iphone-wrap p-10">
                  <img src="assets/img/RRA Logo.png" alt="RRA Logo" className="phone-1" data-aos="fade-right" style={{ width: '13cm', marginTop: '4cm' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default App;
