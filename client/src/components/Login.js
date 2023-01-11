import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Login({setUser, SERVER_URL}) {
    const navigate = useNavigate();
    const[loginData, setLoginData] = useState({username:"", password:""});
    const [err, setErr] = useState("");

    const handleSubmit = function (evt) {
        evt.preventDefault();
        
        fetch(SERVER_URL + "/api/authenticate", {
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
                setErr("Username and/or password is incorrect.");
            }
        })
        .then((jwtContainer) => {
            if(!jwtContainer) {return;}

            const jwt = jwtContainer.jwt_token;
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
        <div className="container d-flex flex-column justify-content-center align-items-center h-100 vw-100 mt-5">
            
            <form onSubmit={handleSubmit} className="form m-3">
                <div className="text-center mb-4">
                    <h3>Login</h3>
                </div>
                <div className="d-flex mb-4">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" className="form-control ml-2" id="username" onChange={handleChange} value={loginData.username}/>
                </div>
                <div className="d-flex">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" className="form-control ml-2" id="password" onChange={handleChange} value={loginData.password}/>
                </div>
                
                <div className="d-flex flex-column justify-content-center">
                    <p className="text-danger font-italic text-center mt-3">{err}</p>
                    <button type="submit" className="btn btn-primary ml-auto mr-auto">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;