import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import UserPermission from "./UserPermission";

function EditPermissions() {
    const context = useContext(AuthContext);
    const [userList, setUserList] = useState([]);

    const getAll = function() {
        fetch("http://localhost:8080/api/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {return response.json()})
        .then((json) => {
            const newList = json.filter((j) => {return j.authorities[0].authority !== "ROLE_ADMIN"})
            setUserList(newList);
        })
    }

    useEffect(getAll, []);
    
    return (
        <div className="container">
            <h3>Edit Permissions</h3>
            {userList.length === 0 ? <div>Loading...</div> :
                userList.map((u) => {
                    return <UserPermission key={u.username} username={u.username} role={u.authorities[0].authority.substring(5)}/>
                })}
        </div>
    );
}

export default EditPermissions;