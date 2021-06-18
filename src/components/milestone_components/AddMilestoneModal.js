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
        size="sm"
        variant="warning"
        onClick={handleShow}
        style={{ filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)" }}
      >
        Create Milestone
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>Add New Milestone to Current Project</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
          <Container className="d-flex p-6 justify-content-center">
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
