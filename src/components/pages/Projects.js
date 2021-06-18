import React from "react";
import { Container } from "react-bootstrap";
import { useGlobal } from "../../contexts/GlobalProvider";
import AddProjectForm from "../AddProjectForm";
import ProjectsClientTable from "../ProjectsClientTable";
import ProjectsModTable from "../ProjectsModTable";

function Projects() {
  const { isMod } = useGlobal();

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

  return (
    <Container className="pb-3 mt-2 m-auto" style={styles.projectsContainer}>
      <Container className="pt-2 pb-2 mb-3" style={styles.addProjectFormlet}>
        {isMod && <AddProjectForm isMod={isMod} />}
      </Container>
      {isMod ? <ProjectsModTable /> : <ProjectsClientTable />}
    </Container>
  );
}

export default Projects;
