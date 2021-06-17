import axios from "axios";
import { useState } from "react";
import { useProjects } from "../contexts/ProjectsProvider";

export default (setProjects, authHeader) => {
  const { loadingProjects } = useProjects();
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(false);

  // creates new project and stores it in (inhereted) hook and also the API

  return {
    loadingProjects,
    input,
    isLoading,
    // populates the add milestone form with input data in realtime
    onChange: (e) =>
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      })),
    onSubmit: async (event) => {
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
        console.log("failed to repopulate projects list", error);
      } finally {
        setLoading(false);
      }
    },
  };
};
