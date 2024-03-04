import './App.css';
import Navbar from './common/Navbar';
import UserDashboard from './pages/UserDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import { check_token } from './redux/slice/AuthSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminPanel from './pages/AdminPanel';


function App() {
  const dispatch = useDispatch();
  //check token avable or not
  function PrivateRoute({ children }) {
    const token =localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

//for Public Route
const PublicRouteNames = [
  {
    path: "/login",
    Component: <Login />
  },
  {

    path: "/register",
    Component: <Register />
  }
]


//for Private Route
const PrivateRouteNames = [
  {
    path: '/',
    Component: <UserDashboard />
  },
  {
    path: '/adminpanel',
    Component: <AdminPanel/>
  },
  
]


useEffect(() => {
  dispatch(check_token())
 }, [])

  return (
    <>
    <Router>
      <ToastContainer/>
          <Navbar/>
          <Routes>
            {PublicRouteNames?.map((route, index) => {
              return (
                <Route
                  Key={index + 1}
                  exact
                  path={route.path}
                  element={route?.Component}
                />
              )
            })}

            {/* Protect Route */}
            {PrivateRouteNames?.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route?.Component}</PrivateRoute>}
                />
              )

            })}
           
          </Routes>
        </Router>
    </>
  );
}

export default App;
