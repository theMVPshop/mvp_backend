import axios from "axios";
import { useState } from "react";
import { useGlobal } from "../contexts/GlobalProvider";
import { useMilestones } from "../contexts/MilestonesProvider";

export default ({ handleClose }) => {
  const { authHeader, activeProject } = useGlobal();
  const { fetchMilestones } = useMilestones();
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    description: "",
    due_date: "",
    ms_status: "TODO",
  });
  const [loading, setLoading] = useState(false);

  // populates the add milestone form with input data in realtime
  const onChange = (e) =>
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const clearForm = () =>
    setInput({
      title: "",
      subtitle: "",
      description: "",
      due_date: "",
    });

  // posts milestone and populates it in the view, then clears input fields
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let postBody = {
      title: input.title,
      subtitle: input.subtitle,
      project_id: activeProject,
      due_date: input.due_date,
      ms_status: "TODO",
      description: input.description,
    };
    try {
      await axios.post("/milestones", postBody, authHeader);
      await fetchMilestones();
    } catch (error) {
      console.error(error);
    } finally {
      clearForm();
      setLoading(false);
      handleClose();
    }
  };

  return {
    loading,
    input,
    onChange,
    onSubmit,
  };
};
