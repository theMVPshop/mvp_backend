import React from "react";
import { Spinner, Container, Modal, Button } from "react-bootstrap";
import useProjectSelectModal from "../../hooks/useProjectSelectModal";
import ProjectsTableModal from "./ProjectsTableModal";

// inherits route from Devlog.js or Milestones.js
function ProjectSelectModal({ route }) {
  const {
    activeProject,
    setActiveProject,
    loading,
    show,
    handleClose,
    handleShow,
    handleProjectClick,
  } = useProjectSelectModal(route);

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Button variant="primary" onClick={handleShow} className="m-2">
          Select Project
        </Button>
      </Container>

      <>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          scrollable
          centered
          animation
        >
          <Modal.Header closeButton style={{ backgroundColor: "var(--blue)" }}>
            <Modal.Title style={{ color: "var(--light)" }}>
              Your Projects
              {loading && (
                <Spinner
                  animation="grow"
                  variant="warning"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ backgroundColor: "gray" }}>
            <Container className="d-flex p-6 justify-content-center">
              <ProjectsTableModal
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

export default ProjectSelectModal;
