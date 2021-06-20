import React from "react";
import { Container } from "react-bootstrap";
import ProjectSelectModal from "../project_components/ProjectSelectModal";
import AddMilestoneModal from "../milestone_components/AddMilestoneModal";
import TimelineElement from "../milestone_components/TimelineElement";
import { useGlobal } from "../../contexts/GlobalProvider";
import { useProjects } from "../../contexts/ProjectsProvider";

function Milestones() {
  const { activeProject } = useGlobal();
  const { permissions, activeProjectTitle } = useProjects();

  const styles = {
    milestonesContainer: {
      backgroundColor: "rgba(0,0,0,.25)",
      border: "solid 3px var(--blue)",
      borderRadius: "30px 30px 0 0",
    },
  };

  return (
    <>
      <Container
        className="pb-3 mb-2 m-auto"
        style={styles.milestonesContainer}
      >
        <div
          className="mileContainer pt-2 pb-2 mb-3"
          style={{ borderRadius: "25px 25px 0 0" }}
        >
          <Container
            className="d-flex p-6 justify-content-evenly mt-2"
            style={{ filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)" }}
          >
            <ProjectSelectModal asModal={true} route={"milestones"} />
          </Container>
          {activeProject && (
            <Container className="d-flex justify-content-center">
              <AddMilestoneModal />
            </Container>
          )}
        </div>
        <h1 className="d-flex p-6 justify-content-center text-light font-weight-bolder bg-primary">
          {activeProjectTitle ||
            (permissions
              ? "Please Select a Project"
              : "Please inform your supervisor to assign you a project")}
        </h1>
        <TimelineElement />
      </Container>
    </>
  );
}

export default Milestones;
