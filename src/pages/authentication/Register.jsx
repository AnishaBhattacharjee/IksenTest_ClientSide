import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slice/AuthSlice';

const initialValue = {
  name: '',
  email: '',
  mobile: '',
  password: '',
};

const Register = () => {
  const { redirectReg } = useSelector((state) => state?.auth);
  const [user, setUser] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = () => {
    let error = {};

    if (!user.name) {
      error.name = 'Name is required';
    }

    if (!user.email) {
      error.email = 'Email is required';
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = 'Enter a valid email';
    }

    if (!user.mobile) {
      error.mobile = 'Mobile is required';
    }
    if (!user.password) {
      error.password = 'Password is required';
    }

    return error;
  };

  const postUserData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const SubmitInfo = async (e) => {
    e.preventDefault();
    const ErrorList = validation();
    setErrors(ErrorList);

    if (Object.keys(ErrorList).length === 0) {
      dispatch(registerUser(user));
    }
  };

  const redirectUser = () => {
    const name = localStorage.getItem('name');
    if (name !== null && name !== undefined && name !== '') {
      navigate('/login');
    }
  };

  useEffect(() => {
    redirectUser();
  }, [redirectReg]);

  return (
    <>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-2">Register Now</p>
                      <form method="post" className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="name"
                              id="form3Example1c"
                              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                              value={user.name}
                              onChange={postUserData}
                            />
                            <label className="form-label" htmlFor="form3Example1c">
                              Your Name
                            </label>
                            <div className="invalid-feedback">{errors.name}</div>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              id="form3Example3c"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              value={user.email}
                              onChange={postUserData}
                            />
                            <label className="form-label" htmlFor="form3Example3c">
                              Your Email
                            </label>
                            <div className="invalid-feedback">{errors.email}</div>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="mobile"
                              id="form3Example4c"
                              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                              value={user.mobile}
                              onChange={postUserData}
                            />
                            <label className="form-label" htmlFor="form3Example4c">
                              Contact Number
                            </label>
                            <div className="invalid-feedback">{errors.mobile}</div>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password"
                              id="form3Example4cd"
                              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                              value={user.password}
                              onChange={postUserData}
                            />
                            <label className="form-label" htmlFor="form3Example4cd">
                              Password
                            </label>
                            <div className="invalid-feedback">{errors.password}</div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" onClick={SubmitInfo} className="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>
                        <p className="text-center medium fw-bold mt-2 pt-1 mb-0">
                          Already have an account? <Link to="/login" className="link-danger" style={{ textDecoration: 'none' }}>
                            Login Here
                          </Link>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
