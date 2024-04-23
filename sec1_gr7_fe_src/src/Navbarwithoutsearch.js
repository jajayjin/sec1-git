import logo from './asset/img/logo.png';
import React, { useEffect, useState } from 'react';
import { GoSearch } from "react-icons/go";
import './Navbarwithoutsearch.css';
import { Link, useLocation, useHistory} from 'react-router-dom';

const Navbarwithsearch = () => {
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
    };
    useEffect(() => {
        const userID = localStorage.getItem("AID");
        if (userID !== null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return (
        <nav className="navbar" style={{ color: "black", backgroundColor: "black" }}>
            <Link to="/">
                <img style={{ width: 80, height: 80 }} src={logo} alt="logo" />
            </Link>
            <div className="links">
                <Link className="button rounded" to="/aboutus" style={{ color: "white", backgroundColor: "red" }}>About us</Link>
                {((location.pathname === "/searchHome" ) && loggedIn) ? (
                    <Link className="button rounded " onClick={handleLogout} to="/"  style={{ color: "white", backgroundColor: "red" }}>Logout</Link>
                ) : (
                    <Link className="button rounded" to="/login" style={{ color: "white", backgroundColor: "red" }}>Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbarwithsearch;
