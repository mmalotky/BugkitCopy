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
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact Us</Link>
            {
                admin ?
                <Link to="/edit_permissions">Edit Permissions</Link> :
                <></>
            }
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