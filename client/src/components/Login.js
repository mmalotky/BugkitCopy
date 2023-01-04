import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Login({setUser}) {
    const navigate = useNavigate();
    const[loginData, setLoginData] = useState({username:"", password:""});
    const [err, setErr] = useState("");

    const handleSubmit = function (evt) {
        evt.preventDefault();
        
        fetch("http://localhost:8080/api/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(loginData)
        })
        .then((response) => {
            if(response.status === 200) {
                console.log(response);
                return response.json();
            }
            else {
                console.log(response);
                setErr("Login Failed.");
            }
        })
        .then((jwtContainer) => {
            if(!jwtContainer) {return;}

            const jwt = jwtContainer.jwt;
            let userData = jwtDecode(jwt);
            userData.authorities = userData.authorities.split(",");

            const newUser = {
                token: jwt,
                userData
            }

            localStorage.setItem("userData", JSON.stringify(newUser));

            setUser(newUser);

            navigate("/");
        });
    }

    const handleChange = function (evt) {
        let newLoginData = {...loginData};
        newLoginData[evt.target.id] = evt.target.value;
        setLoginData(newLoginData);
    }

    return (
        <div className="container">
            <h3>Login</h3>
            <form onSubmit={handleSubmit} className="form m-3">
                <label className="form-label" htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" onChange={handleChange} value={loginData.username}/>
                <label className="form-label" htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange} value={loginData.password}/>
                <button type="submit" className="btn btn-primary m-3">Login</button>
                <p className="text-danger font-italic">{err}</p>
            </form>
        </div>
    );
}

export default Login;