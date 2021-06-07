import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import SetRoles from "./SetRoles";

// inheriting props from AddProjectForm.js
function SetRolesModal({ projects, authHeader }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Assign Roles/Projects
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Roles/Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
          <Container className="d-flex p-6 justify-content-center">
            {/* line below renders SetRoles component */}
            <SetRoles projects={projects} authHeader={authHeader} />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SetRolesModal;
