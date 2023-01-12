import React from "react";

function Contact() {
  return (
    <div className="container d-flex flex-column align-items-center h-100 vw-100 mt-5">
      <h1 className="mt-5">Contact Us</h1>
      <h2 className="mt-1">Have a question? Please reach out!</h2>
      <div className="d-flex">
        <div className="m-2">
          <p>Alex Campbell</p>
        </div>
        <div className="m-2">
          <p>Keegan Kirkwood</p>
        </div>
        <div className="m-2">
          <p>Martin Malotky</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
