import React from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import useAddMilestoneForm from "../../hooks/useAddMilestoneForm";

// props inherited from Milestones.js
function AddMilestoneForm(handleClose) {
  const { loading, input, onChange, onSubmit } =
    useAddMilestoneForm(handleClose);

  return (
    <Container className="d-flex p-6 justify-content-around m-auto">
      <Form>
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
