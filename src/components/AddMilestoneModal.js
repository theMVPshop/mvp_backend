import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import AddMilestoneForm from "./AddMilestoneForm";

// inheriting props from AddProjectForm.js
function AddMilestoneModal({ onChange, onSubmit, input }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        // variant="success"
        size="sm"
        onClick={handleShow}
        // className="nav-link text-success"
        style={{ marginTop: ".5px" }}
      >
        Create Milestone
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>Add New Milestone to Current Project</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
          <Container className="d-flex p-6 justify-content-center">
            {/* line below renders SetRoles component */}
            <AddMilestoneForm
              onChange={onChange}
              input={input}
              onSubmit={onSubmit}
              handleClose={handleClose}
            />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddMilestoneModal;
