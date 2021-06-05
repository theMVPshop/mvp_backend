import React, { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import MilestonesProjectSelectModal from "../MilestonesProjectSelectModal";
import AddMilestoneForm from "../AddMilestoneForm";
import TimelineElement from "../TimelineElement";
import { useProvider } from "../../contexts/ContextProvider";

export default function Milestones({}) {
  const {
    authHeader,
    projects,
    activeProject,
    setActiveProject,
    currentProjectId,
    todos,
    setTodos,
    // fetchMilestones,
    populateProjects,
    // cachedActiveProjectId,
    // handleProjectClick,
    // removeMilestone,
    // handleStatusChange,
  } = useProvider();

  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    description: "",
    due_date: "",
    ms_status: "TODO",
  });

  React.useEffect(() => {
    fetchMilestones();
    populateProjects();
  }, []);

  const fetchMilestones = () =>
    axios
      .get(`/milestones/${currentProjectId}`, authHeader)
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));

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
      .delete(`/milestones/${currentProjectId}`, reqBody)
      .then(() => fetchMilestones())
      .catch((error) => console.log(error));
  };

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
      project_id: currentProjectId,
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

  // updates milestone status in api and component
  const handleStatusChange = (todo) => {
    const todoId = todo.id;
    if (todo.ms_status === "TODO") {
      todo.ms_status = "IN PROGRESS";
      axios.put(
        `/milestones/${todoId}`,
        {
          ms_status: "IN PROGRESS",
        },
        authHeader
      );
    } else if (todo.ms_status === "IN PROGRESS") {
      todo.ms_status = "COMPLETED";
      axios.put(
        `/milestones/${todoId}`,
        {
          ms_status: "COMPLETED",
        },
        authHeader
      );
    } else if (todo.ms_status === "COMPLETED") {
      todo.ms_status = "TODO";
      axios.put(
        `/milestones/${todoId}`,
        {
          ms_status: "TODO",
        },
        authHeader
      );
    }
    setTodos([...todos]);
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
              // handleProjectClick={handleProjectClick}
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
          {projects && (
            <h1 className="d-flex p-6 justify-content-center">
              {currentProjectId &&
                projects.find((x) => x.id == currentProjectId)?.title}
            </h1>
          )}
        </div>
        <TimelineElement
          todos={todos}
          handleClick={handleStatusChange}
          removeItem={removeMilestone}
          authHeader={authHeader}
        />
      </div>
    </>
  );
}
