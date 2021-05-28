import React, { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import MilestonesProjectSelectModal from "../MilestonesProjectSelectModal";
import AddMilestoneForm from "../AddMilestoneForm";
import TimelineElement from "../TimelineElement";

function Milestones() {
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let cachedActiveProject = localStorage.getItem("activeProject");
  const [todos, setTodos] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(cachedActiveProject);
  const [activeProject, setActiveProject] = useState(cachedActiveProject);
  const [activeProjectTitle, setActiveProjectTitle] = useState(null);
  const [projects, setProjects] = useState(null);
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    description: "",
    due_date: "",
    ms_status: "TODO",
  });

  React.useEffect(() => {
    axios
      .get(`/milestones/${cachedActiveProject}`, authHeader)
      .then((response) => {
        setTodos(response.data);
      });
    axios.get("/projects", authHeader).then((response) => {
      setProjects(response.data);
    });
  }, []);

  // populates milestones for the selected project
  const handleProjectClick = (projectId) => {
    axios.get(`/milestones/${projectId}`, authHeader).then((response) => {
      setTodos(response.data);
      setCurrentProjectId(projectId);
      setActiveProject(projectId);
      localStorage.setItem("activeProject", projectId);
    });
    axios.get("/projects", authHeader).then((response) => {
      setProjects(response.data);
    });
  };

  // populates the add milestone form with input data in realtime
  const onChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // posts milestone and populates it in the view, then clears input fields
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `/milestones`,
        {
          title: input.title,
          subtitle: input.subtitle,
          project_id: currentProjectId,
          due_date: input.due_date,
          ms_status: "TODO",
          description: input.description,
        },
        authHeader
      )
      .then(() => {
        axios
          .get(`/milestones/${currentProjectId}`, authHeader)
          .then((response) => {
            setTodos(response.data);
            setInput({
              title: "",
              subtitle: "",
              description: "",
              due_date: "",
            });
          });
      });
  };

  // deletes milestone in api and repopulates component with milestones sans deleted one
  const removeItem = (Id) => {
    axios
      .delete(
        `/milestones/${currentProjectId}`,
        {
          data: {
            id: Id,
          },
        },
        authHeader
      )
      .then(() => {
        axios
          .get(`/milestones/${currentProjectId}`, authHeader)
          .then((response) => {
            setTodos([...response.data.filter((x, i) => i !== Id)]);
          });
      });
  };

  // updates milestone status in api and component
  const handleClick = (todo) => {
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
      <Container className="d-flex p-6 justify-content-center">
        <MilestonesProjectSelectModal
          fromMilestones={true}
          handleProjectClick={handleProjectClick}
          setActiveProject={setActiveProject}
          activeProject={activeProject}
        />
      </Container>
      <Container className="d-flex p-6 justify-content-center">
        <AddMilestoneForm
          onChange={onChange}
          input={input}
          onSubmit={onSubmit}
        />
      </Container>
      {projects && (
        <h1 className="d-flex p-6 justify-content-center">
          {activeProject && projects.find((x) => x.id == activeProject)?.title}
        </h1>
      )}
      <TimelineElement
        todos={todos}
        handleClick={handleClick}
        removeItem={removeItem}
      />
    </>
  );
}

export default Milestones;
