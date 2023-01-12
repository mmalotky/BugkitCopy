import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import UserPermission from "./UserPermission";
import SearchBar from "./SearchBar";

function EditPermissions({SERVER_URL}) {
    const context = useContext(AuthContext);
    const [userList, setUserList] = useState([]);
    const [hidden, setHidden] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getAll = function() {
        setLoaded(false);

        fetch(`${SERVER_URL}/api/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${context.token}`
            }
        })
        .then((response) => {return response.json()})
        .then((json) => {
            const newList = json.filter((j) => {return j.authorities[0].authority !== "ROLE_ADMIN"})
            setUserList(newList);
            setLoaded(true);
        })
    }

    useEffect(getAll, []);

    const search = function (searchTerm) {
        let newList = [];
        userList.map((u) => {
            if(!{...u}.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                newList.push(u);
            }
            return u;
        });

        setHidden(newList);
    }
    
    return (
        <div className="container m-5">
            <section className="d-flex justify-content-between">
                <h1>Edit Permissions</h1>
                <SearchBar search={search}/>
            </section>
            
            <section className="d-flex">
                {userList.length === 0 ? <div>{ loaded ? "No Users Found" : "Loading..."}</div> :
                userList.map((u) => {
                    return <div key={u.username} className={hidden.includes(u) ? "d-none" : ""}>
                        <UserPermission 
                            username={u.username} 
                            role={u.authorities[0].authority.substring(5)}
                            SERVER_URL={SERVER_URL}
                        />
                    </div>
                })}
            </section>
            
        </div>
    );
}

export default EditPermissions;