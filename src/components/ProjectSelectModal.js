import React, { useState } from "react";
import axios from "axios";
import { Spinner, Container, Modal, Button } from "react-bootstrap";
import ProjectsTable from "./ProjectsTable";
import { useGlobal } from "../contexts/GlobalProvider";
import { useDevlog } from "../contexts/DevlogProvider";
import { useMilestones } from "../contexts/MilestonesProvider";

function ProjectSelectModal({ asModal, route }) {
  const { authHeader, activeProject, setActiveProject } = useGlobal();
  const { setMilestones } = useMilestones();
  const { setLogs } = useDevlog();

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // populates milestones for the selected project
  const handleProjectClick = async (Id) => {
    setLoading(true);
    setActiveProject(Id);
    localStorage.setItem("activeProject", Id);
    try {
      let response = await axios.get(`/${route}/${Id}`, authHeader);
      let data = await response.data;
      route === "milestones"
        ? setMilestones(data)
        : route === "devlog"
        ? setLogs(data)
        : null;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // handleClose();
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Button variant="primary" onClick={handleShow} className="m-2">
          Select Project
        </Button>
        {/* {isMod && <AddLogButton />} */}
      </Container>
      <div className="d-flex justify-content-center">
        <>
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            scrollable
            centered
            animation
          >
            <Modal.Header
              closeButton
              style={{ backgroundColor: "var(--blue)" }}
            >
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
                  style={{ backgroundColor: "var(--gray)" }}
                  asModal={asModal}
                  handleProjectClick={handleProjectClick}
                  setActiveProject={setActiveProject}
                  activeProject={activeProject}
                />
              </Container>
            </Modal.Body>
          </Modal>
        </>
      </div>
    </>
  );
}

export default ProjectSelectModal;
