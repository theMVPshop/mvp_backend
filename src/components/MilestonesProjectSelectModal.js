import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import ProjectsTable from "./ProjectsTable";

function MilestonesProjectSelectModal({
  fromMilestones,
  handleProjectClick,
  activeProject,
  setActiveProject,
  AddLogOnClickHandleShow,
  AddLogButton,
  isMod,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Container className="milestones">
        <Container className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleShow}>
            Select Project
          </Button>
          {isMod && <AddLogButton />}
        </Container>
        <div className="row d-flex justify-content-center">
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header
                closeButton
                style={{ backgroundColor: "var(--blue)" }}
              >
                <Modal.Title style={{ color: "var(--light)" }}>
                  Your Projects
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: "gray" }}>
                <Container className="d-flex p-6 justify-content-center">
                  <ProjectsTable
                    style={{ backgroundColor: "var(--gray)" }}
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
    </Container>
  );
}

export default MilestonesProjectSelectModal;
