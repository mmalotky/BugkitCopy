import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar({setUser}) {
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const handleLogout = function () {
        localStorage.setItem("userData", null);
        setUser(null);
        navigate("/");
    }

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact Us</Link>
            {
                context ?
                <button onClick={handleLogout}>Logout</button> :
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/create_account">Create Account</Link>
                </div>
            }
        </nav>
    );
}

export default NavBar;