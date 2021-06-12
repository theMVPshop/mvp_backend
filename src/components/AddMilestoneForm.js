import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Form,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useGlobal } from "../contexts/GlobalProvider";
import { useMilestones } from "../contexts/MilestonesProvider";

// props inherited from Milestones.js
function AddMilestoneForm({ handleClose }) {
  const { authHeader, activeProject } = useGlobal();
  const { fetchMilestones } = useMilestones();
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
    let postBody = {
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
    handleClose();
  };

  return (
    <Container className="d-flex p-6 justify-content-around m-auto">
      <Form>
        {/* <Form.Row> */}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text className="bg-info text-light" id="title-addon1">
              Title
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            name="title"
            placeholder="Title"
            value={input.title}
            onChange={onChange}
            aria-label="Milestone Title"
            aria-describedby="title-addon1"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              className="bg-info text-light"
              id="subtitle-addon1"
            >
              Subtitle
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={input.subtitle}
            onChange={onChange}
            aria-label="Milestone Subtitle"
            aria-describedby="subtitle-addon1"
          />
        </InputGroup>
        {/* </Form.Row> */}
        {/* <Form.Row> */}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text
              className="bg-dark text-light"
              id="description-addon1"
            >
              Description
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            name="description"
            placeholder="Description"
            value={input.description}
            onChange={onChange}
            aria-label="Milestone Description"
            aria-describedby="description-addon1"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text className="bg-warning text-light" id="date-addon1">
              Due Date
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="date"
            name="due_date"
            placeholder="Due Date"
            value={input.due_date}
            onChange={onChange}
            aria-label="Due Date"
            aria-describedby="date-addon1"
          />
        </InputGroup>
        {/* </Form.Row> */}

        <Button
          as={Col}
          variant="primary"
          type="submit"
          className="m-auto"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddMilestoneForm;

{
  /* <Form.Group as={Col} controlId="formGridTitle">
  <Form.Label>Title</Form.Label>
  <Form.Control
    type="text"
    name="title"
    placeholder="Title"
    value={input.title}
    onChange={onChange}
  />
</Form.Group> */
}

{
  /* <Form.Group as={Col} controlId="formGridSubtitle">
<Form.Label>Subtitle</Form.Label>
<Form.Control
type="text"
name="subtitle"
placeholder="Subtitle"
value={input.subtitle}
onChange={onChange}
/>
</Form.Group> */
}
{
  /* <Form.Group as={Col} controlId="formGridDescription">
  <Form.Label>Description</Form.Label>
  <Form.Control
    type="text"
    name="description"
    placeholder="Description"
    value={input.description}
    onChange={onChange}
  />
</Form.Group> */
}

{
  /* <Form.Group as={Col} controlId="formGridDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              placeholder="Due Date"
              value={input.due_date}
              onChange={onChange}
            />
          </Form.Group> */
}
