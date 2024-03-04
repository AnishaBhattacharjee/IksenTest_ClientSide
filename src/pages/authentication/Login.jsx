import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RegLog, loginRequest } from '../../redux/slice/AuthSlice';


const initialValue = {
  email: "",
  password: ""
}

const Login = () => {
  const [user, setUser] = useState(initialValue)
  const { redirectTo } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const validation = () => {
    let error = {};
    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
    ) {
      error.email = "Enter a valid Email";
    }
    if (!user.password) {
      error.password = "Password is Required";
    }
    return error;
  };

  const postUserData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    if (name === "email") {
      setError((prevError) => ({ ...prevError, email: value.length === 0 ? "Email is required" : "" }));
    }
    if (name === "password") {
      setError((prevError) => ({ ...prevError, password: value.length === 0 ? "Password is Required" : "" }));
    }
  };

  const SubmitInfo = async (e) => {
    e?.preventDefault();
    const ErrorList = validation();
    setError(ErrorList);
    const data = {
        "email": user.email,
        "password": user.password,
    };

    try {
        await dispatch(loginRequest(data));
        const role = localStorage.getItem('isAdmin');
        if (role === 'admin') {
            navigate("/adminpanel");
        } else {
            navigate('/');
        }
    } catch (error) {
        console.error('Login error:', error);
    }
};


  useEffect(() => {
    if (redirectTo === "/") {
      navigate("/");
    }
  }, [redirectTo, navigate]);

  const redirectUser = () => {
    const token = localStorage.getItem("userToken");
    const isInLoginPage = window.location.pathname.toLowerCase() === "/login";

    if (token && isInLoginPage) {
      navigate("/");
    }
  };

  useEffect(() => {
    redirectUser();
  }, []);

  const log = () => {
    dispatch(RegLog());
  };

    return (
        <>

<section className="vh-100">
  <div className="container-fluid h-custom pb-5">
    <div className="row d-flex justify-content-center align-items-center h-100 pt-5 mt-4">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="h2 fw-bold mb-0 me-3 pb-4 ">Login Here</p>

          </div>
          {/* Email input */}
          <div className="form-outline mb-2">
            <input type="email" name="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address"
            onChange={e => postUserData(e)}
            />
            <label className="form-label" htmlFor="form3Example3">Email address</label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-0">
            <input type="password" name="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password"
            onChange={e => postUserData(e)}
            />
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" onClick={SubmitInfo} className="btn btn-primary btn-lg" style={{paddingLeft: '2rem', paddingRight: '2rem'}}>Login</button>
            <p className="medium fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to='/register' className="link-danger" style={{textDecoration:"none"}}>Register Now</Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
  <hr/>
  
</section>

        </>
    )
}

export default Login