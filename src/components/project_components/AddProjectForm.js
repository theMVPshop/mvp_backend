import React from "react";
import { Spinner, Container, Button } from "react-bootstrap";
import useAddProjectForm from "../../hooks/useAddProjectForm";

function AddProjectForm() {
  const {
    isLoading: addingProject,
    deletingProject,
    input,
    onChange,
    onSubmit,
  } = useAddProjectForm();

  const projectIsDeletingButton = (
    <Button variant="danger">
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Deleting...
    </Button>
  );

  const projectIsAddingButton = (
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
  );

  const addProjectButton = (
    <Button type="submit" value="Submit" className="btn" style={{ flex: "1" }}>
      Add Project
    </Button>
  );

  return (
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

        {deletingProject
          ? projectIsDeletingButton
          : addingProject
          ? projectIsAddingButton
          : addProjectButton}
      </form>
    </Container>
  );
}

export default AddProjectForm;
