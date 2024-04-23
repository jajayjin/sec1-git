import { Link, useLocation, useHistory} from 'react-router-dom';
import logo from './asset/img/logo.png';
import React, {useEffect,useState} from 'react';
import { GoSearch } from "react-icons/go";
import './Navbarwithsearch.css';
const Navbarwithsearch = () => {
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };
    console.log(location.pathname)
    useEffect(() => {
        const userID = localStorage.getItem("AID");
        if (userID !== null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return ( 
        <nav className="navbar"><Link to="/">
        <img style={{ width: 80, height: 80 }} src={logo} alt="logo"/>
    </Link>
    <Link to="/searchHome">
    <div className= "whitebox">
        <div className="box">
            <div className="searchcicon">
                <GoSearch />
            </div>
        </div>
    </div></Link>
    <div className="links">
    {((location.pathname === "/" || location.pathname === "/aboutus" ) && loggedIn) ? (
                    <Link className="button rounded "  to="/usermanage"  style={{ color: "white", backgroundColor: "red" }}>Manage</Link>
                ) : (
                    null
                )}
                <Link className="button rounded" to="/aboutus" style={{ color: "white", backgroundColor: "red" }}>About us</Link>
                {((location.pathname === "/" || location.pathname === "/aboutus" || location.pathname === "/productdetail/${}") && loggedIn) ? (
                    <Link className="button rounded " onClick={handleLogout} to="/"  style={{ color: "white", backgroundColor: "red" }}>Logout</Link>
                ) : (
                    <Link className="button rounded" to="/login" style={{ color: "white", backgroundColor: "red" }}>Login</Link>
                )}
            </div>
       
 </nav>

     );
}
 
export default Navbarwithsearch;