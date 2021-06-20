import React from "react";
import { Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useGlobal } from "../../contexts/GlobalProvider";
import { useProjects } from "../../contexts/ProjectsProvider";
import AddProjectForm from "../project_components/AddProjectForm";
import ProjectsClientTable from "../project_components/ProjectsClientTable";
import ProjectsModTable from "../project_components/ProjectsModTable";

function Projects() {
  const { isMod } = useGlobal();
  const { loadingProjects } = useProjects();

  const styles = {
    projectsContainer: {
      backgroundColor: "rgba(0,0,0,.25)",
      border: "solid 3px var(--blue)",
      borderRadius: "30px 30px 0 0",
    },
    addProjectFormlet: {
      filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)",
    },
  };

  const spinner = (
    <Spinner
      variant="success"
      animation="border"
      role="status"
      aria-hidden="true"
      className="d-flex m-auto"
    />
  );

  return (
    <Container className="pb-3 mt-2 m-auto" style={styles.projectsContainer}>
      <Container className="pt-2 pb-2 mb-3" style={styles.addProjectFormlet}>
        {isMod && <AddProjectForm isMod={isMod} />}
      </Container>
      {loadingProjects ? (
        spinner
      ) : isMod ? (
        <ProjectsModTable />
      ) : (
        <ProjectsClientTable />
      )}
    </Container>
  );
}

export default Projects;
