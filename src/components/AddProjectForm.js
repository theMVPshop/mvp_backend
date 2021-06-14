import React, { useState } from "react";
import axios from "axios";
import { Spinner, Container, Button } from "react-bootstrap";
// import SetRolesModal from "./SetRolesModal";

// inheriting props/state from ProjectsTable.js
function AddProjectForm({ isMod, setProjects, authHeader }) {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(false);

  // controls all the input fields in the form
  const onChange = (event) =>
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  // creates new project and stores it in (inhereted) hook and also the API
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let project = { title: input.title, description: input.description };
    try {
      await axios.post("/projects", project, authHeader);
      let response = await axios.get("/projects", authHeader);
      project.id = response.data[response.data.length - 1].id; // guarantees that projectId in client table remains accurate no matter how many projects are deleted and added within the database
      setProjects(response.data);
    } catch (error) {
      console.log("failed to repopulate projects list", error);
    } finally {
      setInput({ title: "", description: "" }); // clear input field
      setLoading(false);
    }
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

            {isLoading ? (
              <>
                <Button variant="success">
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Adding...
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                value="Submit"
                className="btn"
                style={{ flex: "1" }}
              >
                Add Project
              </Button>
            )}

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
