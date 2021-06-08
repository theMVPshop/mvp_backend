import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import MilestonesProjectSelectModal from "../MilestonesProjectSelectModal";
import AddMilestoneForm from "../AddMilestoneForm";
import TimelineElement from "../TimelineElement";
import { useGlobal } from "../../contexts/GlobalProvider";
import useLocalStorage from "../../hooks/useLocalStorage";

function Milestones() {
  const { token, authHeader, activeProject, setActiveProject, projects } =
    useGlobal();
  const [milestones, setMilestones] = useLocalStorage("milestones", []);
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    description: "",
    due_date: "",
    ms_status: "TODO",
  });

  const fetchMilestones = () =>
    axios
      .get(`/milestones/${activeProject}`, authHeader)
      .then((response) => setMilestones(response.data))
      .catch((error) => console.log("failed to fetch milestones", error));

  useEffect(() => {
    fetchMilestones();
  }, [activeProject]);

  // populates milestones for the selected project
  const handleProjectClick = (Id) =>
    axios
      .get(`/milestones/${Id}`, authHeader)
      .then((response) => {
        localStorage.setItem("activeProject", Id);
        setActiveProject(Id);
        setMilestones(response.data);
      })
      .then(() => populateProjects())
      .catch((error) => console.log(error));

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

  // deletes milestone in api and repopulates component with milestones sans deleted one
  const removeMilestone = (Id) => {
    const reqBody = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: Id,
      },
    };

    axios
      .delete(`/milestones/${activeProject}`, reqBody)
      .then(() => fetchMilestones())
      .catch((error) => console.log(error));
  };

  // updates milestone status in api and component
  const handleStatusChange = (milestone) => {
    const milestoneId = milestone.id;
    const setStatus = (status) => {
      axios.put(
        `/milestones/${milestoneId}`,
        {
          ms_status: status,
        },
        authHeader
      );
    };
    if (milestone.ms_status === "TODO") {
      milestone.ms_status = "IN PROGRESS";
      setStatus("IN PROGRESS");
    } else if (milestone.ms_status === "IN PROGRESS") {
      milestone.ms_status = "COMPLETED";
      setStatus("COMPLETED");
    } else if (milestone.ms_status === "COMPLETED") {
      milestone.ms_status = "TODO";
      setStatus("TODO");
    }
    setMilestones([...milestones]);
  };

  return (
    <>
      <div
        className="pb-3 mb-2"
        style={{
          backgroundColor: "rgba(0,0,0,.25",
          margin: "auto",
          border: "solid 3px var(--indigo)",
          width: "100%",
          borderRadius: "30px 30px 0 0",
        }}
      >
        <div
          className="mileContainer pt-2 pb-2 mb-3"
          style={{
            backgroundColor: "var(--indigo)",
            color: "var(--light)",
            borderRadius: "25px 25px 0 0",
            filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)",
          }}
        >
          <Container className="d-flex p-6 justify-content-evenly mt-2">
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
          <h1 className="d-flex p-6 justify-content-center">
            {projects?.find((x) => x.id == activeProject)?.title ||
              "Please Select a Project"}
          </h1>
        </div>
        <TimelineElement
          milestones={milestones}
          handleStatusChange={handleStatusChange}
          removeMilestone={removeMilestone}
          authHeader={authHeader}
        />
      </div>
    </>
  );
}

export default Milestones;
