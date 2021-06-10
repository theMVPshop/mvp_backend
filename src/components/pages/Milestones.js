import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import MilestonesProjectSelectModal from "../MilestonesProjectSelectModal";
import AddMilestoneForm from "../AddMilestoneForm";
import TimelineElement from "../TimelineElement";
import { useGlobal } from "../../contexts/GlobalProvider";
import { useMilestones } from "../../contexts/MilestonesProvider";

function Milestones() {
  const { authHeader, activeProject, setActiveProject, projects, isMod } =
    useGlobal();
  const {
    milestones,
    fetchMilestones,
    handleProjectClick,
    removeMilestone,
    handleStatusChange,
  } = useMilestones();
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    description: "",
    due_date: "",
    ms_status: "TODO",
  });

  // populates the add milestone form with input data in realtime
  const onChange = (event) =>
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  const clearForm = () =>
    setInput({
      title: "",
      subtitle: "",
      description: "",
      due_date: "",
    });

  // posts milestone and populates it in the view, then clears input fields
  const onSubmit = (event) => {
    event.preventDefault();
    const postBody = {
      title: input.title,
      subtitle: input.subtitle,
      project_id: activeProject,
      due_date: input.due_date,
      ms_status: "TODO",
      description: input.description,
    };
    axios
      .post("/milestones", postBody, authHeader)
      .then(() => fetchMilestones())
      .then(() => clearForm())
      .catch((error) => console.log(error));
  };

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
            <MilestonesProjectSelectModal
              fromMilestones={true}
              handleProjectClick={handleProjectClick}
              setActiveProject={setActiveProject}
              activeProject={activeProject}
            />
          </Container>
          <Container className="d-flex p-6 justify-content-center mt-2 mb-2 ms-2">
            <AddMilestoneForm
              className="ms-3 me-2"
              onChange={onChange}
              input={input}
              onSubmit={onSubmit}
            />
          </Container>
        </div>
        <h1
          className="d-flex p-6 justify-content-center"
          style={{ color: "black" }}
        >
          {isMod
            ? projects?.find((x) => x.id == activeProject)?.title ||
              "Please Select a Project"
            : "Please inform your supervisor to assign you a project"}
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
