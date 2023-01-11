import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function UserPermission({username, role, SERVER_URL}) {
    const context = useContext(AuthContext);
    const [newRole, setNewRole] = useState(role);
    const [message, setMessage] = useState("");

    const handleSubmit = function (evt) {
        evt.preventDefault();

        fetch(`${SERVER_URL}/api/update_user/${username}/${newRole}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {
            if(response.status === 204) {
                console.log(response);
                setMessage("Updated");
            }
            else {
                console.log(response);
                setMessage("Update Failed");
            }
        })
    }

    const handleChange = function (evt) {
        setNewRole(evt.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex border rounded justify-content-around m-3">
                <p className="m-1 text-uppercase text-info">{username}</p>
                <select name="role" onChange={handleChange} value={newRole} className="form-control w-25 m-1">
                    <option value="USER">User</option>
                    <option value="DEV">Developer</option>
                    <option value="ADMIN">Administrator</option>
                </select>
                <button className="btn btn-primary btn-sm m-1">Update Role</button>
            </form>
            <p className="font-italic">{message}</p>
        </div>
        
    );
}

export default UserPermission;