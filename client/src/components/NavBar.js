import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar({setUser}) {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    let admin = false;
    if(context) {
        admin = context.userData.authorities.includes("ADMIN");
    }

    const handleLogout = function () {
        localStorage.setItem("userData", null);
        setUser(null);
        navigate("/");
    }

    return (
        <nav className="navbar bg-dark sticky-top">
            <div className="container-fluid">
                <ul className="nav navbar">
                    <li><Link className="nav-link text-white" to="/">Home</Link></li>
                    <li><Link className="nav-link text-white" to="/bugs">View Bugs</Link></li>
                    <li><Link className="nav-link text-white" to="/contact">Contact Us</Link></li>
                    {
                        admin ?
                        <Link className="nav-link text-white" to="/edit_permissions">Edit Permissions</Link> :
                        <></>
                    }
                </ul>
                <ul className="nav navbar navbar-right">
                    {
                        context ?
                        <></> :
                        <Link className="btn btn-primary mr-4" to="/create_account">Create Account</Link>
                    }

                    {
                        context ?
                        <button onClick={handleLogout} className="btn btn-danger">Logout</button> :
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;