import React, { useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import SetRolesModal from "./SetRolesModal";

// inheriting props/state from ProjectsTable.js
function AddProjectForm({ isMod, projects, setProjects }) {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  // controls all the input fields in the add project form
  const onChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // creates new project and stores it in hook and also the API
  const onSubmit = (event) => {
    event.preventDefault();

    let project = {
      title: input.title,
      description: input.description,
    };

    axios
      .post("/projects", project, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        axios
          .get("/projects", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            project.id = response.data[response.data.length - 1].id;
            setProjects([...response.data]);
          });
      });

    // clear input fields
    setInput({
      title: "",
      description: "",
    });
  };

  return (
    <div>
      {isMod && (
        <Container className="d-flex p-6 justify-content-center">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="title"
              style={{ flex: "10", padding: "5px" }}
              placeholder="Title ..."
              value={input.title}
              onChange={onChange}
            />
            <input
              type="text"
              name="description"
              style={{ flex: "10", padding: "5px" }}
              placeholder="Description ..."
              value={input.description}
              onChange={onChange}
            />
            <Button
              type="submit"
              value="Submit"
              className="btn"
              style={{ flex: "1" }}
            >
              Add Project
            </Button>
            <Container className="d-flex p-6 justify-content-center">
              {/* render SetRolesModal button */}
              <SetRolesModal projects={projects} />
            </Container>
          </form>
        </Container>
      )}
    </div>
  );
}

export default AddProjectForm;
