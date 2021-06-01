import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import ProjectsTableModal from "./ProjectsTableModal";

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
    <Container className="milestones">
      <div className="row d-flex justify-content-center">
        <Button variant="secondary" onClick={handleShow}>
          Select Project
        </Button>
        <>
          <Modal show={show} onHide={handleClose} style={{ width: "800px" }}>
            <Modal.Header
              closeButton
              style={{ backgroundColor: "var(--indigo)" }}
            >
              <Modal.Title style={{ color: "var(--light)" }}>
                Your Projects
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#441091" }}>
              <Container className="d-flex p-6 justify-content-center">
                <ProjectsTableModal
                  style={{ backgroundColor: "var(--indigo)" }}
                  fromMilestones={fromMilestones}
                  handleProjectClick={handleProjectClick}
                  setActiveProject={setActiveProject}
                  activeProject={activeProject}
                />
              </Container>
            </Modal.Body>
          </Modal>
        </>
      </div>
    </Container>
  );
}

export default MilestonesProjectSelectModal;
