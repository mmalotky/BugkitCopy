import React, { useEffect, useState } from "react";
import UserPermission from "./UserPermission";

function EditPermissions() {
    const [userList, setUserList] = useState([]);

    const getAll = function() {
        fetch("http://localhost:8080/api/user_list")
        .then((response) => {return response.json()})
        .then((json) => {setUserList(json)})
    }

    useEffect(getAll, []);
    
    return (
        <div className="container">
            <h3>Edit Permissions</h3>
            {userList.length === 0 ? <div>Loading...</div> :
                userList.map((u) => {
                    return <UserPermission username={u.username} role={u.role}/>
                })}
        </div>
    );
}

export default EditPermissions;