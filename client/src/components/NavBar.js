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
        <nav className="navbar bg-light border-bottom">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/contact">Contact Us</Link>
            <Link className="nav-link" to="/bugs">View Bugs</Link>
            {
                admin ?
                <Link className="nav-link" to="/edit_permissions">Edit Permissions</Link> :
                <></>
            }
            {
                context ?
                <></> :
                <Link className="nav-link" to="/create_account">Create Account</Link>
            }

            {
                context ?
                <button onClick={handleLogout} className="btn btn-danger">Logout</button> :
                <Link to="/login" className="btn btn-primary">Login</Link>
            }
        </nav>
    );
}

export default NavBar;