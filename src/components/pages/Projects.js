import React from "react";
import ProjectsTable from "../ProjectsTable";

function Projects() {
  return (
    <>
      <div  className="pb-3 mb-2"style={{ backgroundColor: "rgba(0,0,0,.25", margin: "auto", border: "solid 3px var(--indigo)", width:"80%", borderRadius: "30px 30px 0 0" }}>
        <div className="mileContainer pt-2 pb-2 mb-3" style={{ backgroundColor: "var(--indigo)", borderRadius: "25px 25px 0 0", filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)" }}>
          <ProjectsTable />
        </div>
      </div>
    </>
  );
}

export default Projects;
