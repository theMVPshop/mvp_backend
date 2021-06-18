import React from "react";
import { Spinner, Container, Modal, Button } from "react-bootstrap";
import ProjectsTable from "./ProjectsTable";
import useProjectSelectModal from "../hooks/useProjectSelectModal";

// inherits props from Devlog.js and Milestones.js
function ProjectSelectModal({ asModal, route }) {
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
        {/* {isMod && <AddLogButton />} */}
      </Container>

      <>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          scrollable
          centered
          animation
          // className="fixed-top"
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
              <ProjectsTable
                asModal={asModal}
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
