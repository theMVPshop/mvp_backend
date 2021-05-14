import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import ProjectsTable from "./ProjectsTable";

function MilestonesProjectSelectModal({
  fromMilestones,
  handleProjectClick,
  activeProject,
  setActiveProject,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Select Project
      </Button>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your Projects</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
            <Container className="d-flex p-6 justify-content-center">
              <ProjectsTable
                fromMilestones={fromMilestones}
                handleProjectClick={handleProjectClick}
                setActiveProject={setActiveProject}
                activeProject={activeProject}
              />
            </Container>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default MilestonesProjectSelectModal;
