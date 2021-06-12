import React, { useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
// import SetRolesModal from "./SetRolesModal";

// inheriting props/state from ProjectsTable.js
function AddProjectForm({ isMod, setProjects, authHeader }) {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  // controls all the input fields in the form
  const onChange = (event) =>
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  // creates new project and stores it in (inhereted) hook and also the API
  const onSubmit = (event) => {
    event.preventDefault();
    const project = { title: input.title, description: input.description };

    const postProject = () =>
      axios
        .post("/projects", project, authHeader)
        .catch((error) => console.log("failed to post project", error));

    const repopulateList = () =>
      axios
        .get("/projects", authHeader)
        .then((response) => {
          project.id = response.data[response.data.length - 1].id; // guarantees that projectId in client table remains accurate no matter how many projects are deleted and added within the database
          setProjects(response.data);
        })
        .catch((error) =>
          console.log("failed to repopulate projects list", error)
        );

    postProject().then(() => repopulateList());
    setInput({ title: "", description: "" }); // clear input field
  };

  return (
    <>
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
              {/* line below renders SetRolesModal button */}
              {/* <SetRolesModal projects={projects} authHeader={authHeader} /> */}
            </Container>
          </form>
        </Container>
      )}
    </>
  );
}

export default AddProjectForm;
