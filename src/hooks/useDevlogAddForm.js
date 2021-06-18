import axios from "axios";
import { useState } from "react";

export default (activeProject, authHeader, fetchLogs) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState();

  const [input, setInput] = useState({
    title: "",
    description: "",
    time_stamp: "",
    project_id: activeProject,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clearForm = () =>
    setInput({
      title: "",
      description: "",
      time_stamp: "",
    });

  return {
    show,
    input,
    loading,
    handleShow,
    handleClose,
    onChange: (e) =>
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      })),
    onSubmit: async (event) => {
      event.preventDefault();
      setLoading(true);
      let date = new Date().toLocaleString();
      const reqBody = {
        title: input.title,
        description: input.description,
        project_id: activeProject,
        time_stamp: date,
      };
      try {
        await axios.post("/devlog", reqBody, authHeader);
        await fetchLogs();
      } catch (error) {
        console.error(error);
      } finally {
        clearForm();
        handleClose();
        setLoading(false);
      }
    },
  };
};
