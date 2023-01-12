import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
  const context = useContext(AuthContext);
  let name = "";
  if (context) {
    name = context.userData.sub;
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center h-100 vw-100 mt-5">
      <h1>
        Welcome <span className="text-info text-uppercase">{name}</span> to
        bugket.com
      </h1>
      <p>Select on option from the navigation bar to get started!</p>
    </div>
  );
}

export default Home;
