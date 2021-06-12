import React from "react";
import { Container } from "react-bootstrap";
import ProjectSelectModal from "../ProjectSelectModal";
import AddMilestoneModal from "../AddMilestoneModal";
import TimelineElement from "../TimelineElement";
import { useGlobal } from "../../contexts/GlobalProvider";
import { useMilestones } from "../../contexts/MilestonesProvider";

function Milestones() {
  const {
    authHeader,
    activeProject,
    setActiveProject,
    activeProjectTitle,
    permissions,
  } = useGlobal();
  const {
    milestones,
    handleProjectClick,
    removeMilestone,
    handleStatusChange,
  } = useMilestones();

  return (
    <>
      <Container
        className="pb-3 mb-2 m-auto"
        style={{
          backgroundColor: "rgba(0,0,0,.25)",
          border: "solid 3px var(--blue)",
          borderRadius: "30px 30px 0 0",
        }}
      >
        <div
          className="mileContainer pt-2 pb-2 mb-3"
          style={{
            // backgroundColor: "var(--blue)",
            color: "var(--light)",
            borderRadius: "25px 25px 0 0",
          }}
        >
          <Container
            className="d-flex p-6 justify-content-evenly mt-2"
            style={{
              filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)",
            }}
          >
            <ProjectSelectModal
              asModal={true}
              handleProjectClick={handleProjectClick}
              setActiveProject={setActiveProject}
              activeProject={activeProject}
            />
          </Container>
          <Container className="d-flex p-6 justify-content-center mt-2 mb-2 ms-2">
            <AddMilestoneModal className="ms-3 me-2" />
          </Container>
        </div>
        <h1
          className="d-flex p-6 justify-content-center"
          style={{ color: "black" }}
        >
          {activeProjectTitle ||
            (permissions
              ? "Please Select a Project"
              : "Please inform your supervisor to assign you a project")}
        </h1>
        <TimelineElement
          milestones={milestones}
          handleStatusChange={handleStatusChange}
          removeMilestone={removeMilestone}
          authHeader={authHeader}
        />
      </Container>
    </>
  );
}

export default Milestones;
