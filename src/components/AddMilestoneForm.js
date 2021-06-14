import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Form,
  // Col,
  InputGroup,
  FormControl,
  Spinner,
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
      console.log(error);
    } finally {
      clearForm();
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Container className="d-flex p-6 justify-content-around m-auto">
      <Form>
        {/* <Form.Row> */}

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

        <InputGroup className="mb-3">
          {/* <InputGroup.Prepend>
            <InputGroup.Text className="bg-info text-light" id="title-addon1">
              Title
            </InputGroup.Text>
          </InputGroup.Prepend> */}
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
          {/* <InputGroup.Prepend>
            <InputGroup.Text
              className="bg-info text-light"
              id="subtitle-addon1"
            >
              Subtitle
            </InputGroup.Text>
          </InputGroup.Prepend> */}
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

        <Form.Group controlId="formGridDescription">
          {/* <Form.Label>Description</Form.Label> */}
          <Form.Control
            type="text"
            as="textarea"
            rows={5}
            name="description"
            placeholder="Description"
            value={input.description}
            onChange={onChange}
          />
        </Form.Group>

        {/* </Form.Row> */}

        {loading ? (
          <>
            <Button variant="primary btn-block" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Adding...
            </Button>
          </>
        ) : (
          <Button
            // as={Col}
            variant="primary"
            type="submit"
            className="m-auto float-right w-100"
            onClick={onSubmit}
          >
            Submit
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default AddMilestoneForm;
