import axios from "axios";
import { useState } from "react";
import useProjectsTable from "../hooks/useProjectsTable";
import { useProjects } from "../contexts/ProjectsProvider";

export default () => {
  const { setProjects, authHeader } = useProjectsTable();

  const { deletingProject } = useProjects();
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(false);

  const onChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setInput({ title: "", description: "" }); // clear input field
    let project = { title: input.title, description: input.description };
    try {
      await axios.post("/projects", project, authHeader);
      let response = await axios.get("/projects", authHeader);
      project.id = response.data[response.data.length - 1].id; // guarantees that projectId in client table remains accurate no matter how many projects are deleted and added within the database
      setProjects(response.data);
    } catch (error) {
      console.error("failed to repopulate projects list", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    deletingProject,
    input,
    isLoading,
    onChange,
    onSubmit,
  };
};
