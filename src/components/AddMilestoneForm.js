import React from "react";
import {
  Button,
  Container,
  Form,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

// props inherited from Milestones.js
function AddMilestoneForm({ onSubmit, onChange, input }) {
  return (
    // <div>
    <Container className="d-flex p-6 justify-content-around m-auto">
      <Form onSubmit={onSubmit}>
        <Form.Row>
          {/* <Form.Group as={Col} controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Title"
              value={input.title}
              onChange={onChange}
            />
          </Form.Group> */}

          <InputGroup as={Col} className="mb-3">
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

          {/* <Form.Group as={Col} controlId="formGridSubtitle">
            <Form.Label>Subtitle</Form.Label>
            <Form.Control
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={input.subtitle}
              onChange={onChange}
            />
          </Form.Group> */}

          <InputGroup as={Col} className="mb-3">
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
        </Form.Row>

        <Form.Row>
          {/* <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={input.description}
              onChange={onChange}
            />
          </Form.Group> */}

          <InputGroup as={Col} className="mb-3">
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

          <InputGroup as={Col} className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text
                className="bg-warning text-light"
                id="date-addon1"
              >
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

          {/* <Form.Group as={Col} controlId="formGridDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              placeholder="Due Date"
              value={input.due_date}
              onChange={onChange}
            />
          </Form.Group> */}
        </Form.Row>
        <Button as={Col} variant="primary" type="submit" className="m-auto">
          Submit
        </Button>
      </Form>
    </Container>
    // </div>
  );
}

export default AddMilestoneForm;
