import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/AuthSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Logouttoggle } = useSelector((state) => state?.auth);
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("isAdmin");

    const log = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand" style={{ fontWeight: 'bold' }}>
                    {Logouttoggle && role ? (
                        <>Hello, {role === 'admin' ? 'Admin' : 'User'}....</>
                    ) : (
                        <>Welcome</>
                    )}
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {Logouttoggle && name && role ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link" style={{ fontWeight: 'bold' }}>
                                        <i className="fas fa-user me-1"></i> {name}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={log} style={{ fontWeight: 'bold' }}>
                                        <i className="fas fa-sign-out-alt me-1"></i> Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" style={{ fontWeight: 'bold' }}>
                                        <i className="fas fa-sign-in-alt me-1"></i> Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
