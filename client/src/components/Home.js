import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
    const context = useContext(AuthContext);
    let name = "";
    if(context){
        name = context.userData.sub;
    }

    return (
        <div className="container">
            <h3>Welcome <span className="text-info text-uppercase">{name}</span> to bugket.com</h3>
            <p>Select on option from the navigation bar to get started!</p>
        </div>
    );
}

export default Home;