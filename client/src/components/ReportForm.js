import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function ReportForm({ SERVER_URL }) {
  const [title, setTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [replicationInstructions, setReplicationInstructions] = useState("");
  const [errors, setErrors] = useState([]);

  const context = useContext(AuthContext);
  const name = context.userData.sub;

  const today = new Date();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    add();
  };

  const add = () => {
    const report = {
      title,
      issueDescription,
      replicationInstructions,
      completionStatus: false,
      postDate: today,
      authorUsername: name,
    };
    fetch(SERVER_URL + "/api/reports/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(report),
    }).then((result) => {
      if (result.status === 201) {
        clearForm();
        setErrors([]);
        navigate("/bugs");
      } else {
        result.json().then((errors) => {
          setErrors(errors);
        });
      }
    });
  };

  const cancelAdd = () => {
    clearForm();
    navigate("/bugs");
  };

  const clearForm = () => {
    setTitle("");
    setIssueDescription("");
    setReplicationInstructions("");
  };

  return (
    <div className="ml-5 mt-5">
      <h3>Add A Bug Report</h3>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label className="form-label" htmlFor="titleInput">
            Title:{" "}
          </label>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            type="text"
            className="form-control w-25 mb-3"
            id="title-input"
          />
        </div>

        <div>
          <label className="form-label" htmlFor="issueDescriptionInput">
            Issue Description:{" "}
          </label>
          <textarea
            value={issueDescription}
            onChange={(event) => {
              setIssueDescription(event.target.value);
            }}
            className="form-control w-75 mb-3"
            id="issueDescription-input"
            rows="5"
          />
        </div>

        <div>
          <label className="form-label" htmlFor="replicationInstructionsInput">
            Replication Instructions:{" "}
          </label>
          <textarea
            value={replicationInstructions}
            onChange={(event) => {
              setReplicationInstructions(event.target.value);
            }}
            className="form-control w-75 mb-3"
            id="replicationInstructions-input"
            rows="5"
          />
        </div>

        <div className="d-flex m-2 flex-column justify-content-center w-25">
          <button type="submit" className="btn btn-primary ">
            Submit Report
          </button>
        </div>

        <div className="d-flex m-2 flex-column justify-content-center w-25">
          <button className="btn btn-danger" onClick={() => cancelAdd()}>
            Cancel Report
          </button>
        </div>
      </form>
      <section id="errors">
        {errors.length > 0 ? (
          <ul>
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
