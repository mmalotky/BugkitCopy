import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const [loginData, setLoginData] = useState({username:"", password:"", passwordConfirm:""})
    const [valid, setValid] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleSubmit = function (evt) {
        evt.preventDefault();
        
        if(!valid) {
            return;
        }

        const submission = {username: loginData.username, password: loginData.password};

        fetch("http://localhost:8080/api/create_account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(submission)
        })
        .then((response) => {
            if(response.status === 201) {
                console.log(response);
                debugger;
                navigate("/login");
            }
            else {
                console.log(response);
                setErr("Failed to create account.");
            }
        });
    }

    const handleChange = function (evt) {
        let newLoginData = {...loginData};
        newLoginData[evt.target.id] = evt.target.value;

        if(newLoginData.password === newLoginData.passwordConfirm) {
            setValid(true);
            setErr("");
        }
        else {
            setValid(false);
            setErr("Passwords must match.");
        }

        setLoginData(newLoginData);
    }
    
    return (
        <div className="container">
            <h3>Create Account</h3>
            <form onSubmit={handleSubmit} className="form m-3">
                <label className="form-label" htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" onChange={handleChange} value={loginData.username}/>
                <label className="form-label" htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange} value={loginData.password}/>
                <label className="form-label" htmlFor="passwordConfirm">Confirm Password</label>
                <input type="password" className="form-control" id="passwordConfirm" onChange={handleChange} value={loginData.passwordConfirm}/>
                <button type="submit" className="btn btn-primary m-3">submit</button>
                <p className="text-danger font-italic">{err}</p>
            </form>
        </div>
    );
}

export default CreateAccount;