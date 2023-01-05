import React, { useState } from "react";

function UserPermission({username, role}) {
    const [newRole, setNewRole] = useState(role);
    const [message, setMessage] = useState("");

    const handleSubmit = function (evt) {
        evt.preventDefault();

        fetch(`http://localhost:8080/api/update_user/${username}/${newRole}`, {
            method: "PUT"
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
            <form onSubmit={handleSubmit} className="d-flex border justify-content-around">
                <p className="m-1">{username}</p>
                <select name="role" onChange={handleChange} value={newRole} className="form-control m-1">
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