import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact Us</Link>
        </nav>
    );
}

export default NavBar;