import React from "react";
import {
  Container,
  Button,
  Form,
  Modal,
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import useDevlogAddForm from "../hooks/useDevlogAddForm";

// inherits props from Devlog.js
function DevlogAddFormModal({ activeProject, authHeader, fetchLogs }) {
  const { show, input, loading, handleShow, handleClose, onChange, onSubmit } =
    useDevlogAddForm(activeProject, authHeader, fetchLogs);

  return (
    <>
      {activeProject && (
        <Button
          variant="success"
          onClick={handleShow}
          className="w-auto m-auto"
          // style={{ filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)" }}
        >
          Add Log Entry
        </Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Entry to Developer Log</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
          <Container className="d-flex p-6 justify-content-around m-auto">
            <Form className="" onSubmit={onSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    className="bg-info text-light"
                    id="title-addon1"
                  >
                    Post Title
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  // placeholder="Post Title..."
                  value={input.title}
                  onChange={onChange}
                  name="title"
                  aria-label="Post Title"
                  aria-describedby="title-addon1"
                />
              </InputGroup>

              <Form.Group controlId="post">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={input.description}
                  onChange={onChange}
                  name="description"
                  placeholder="Post Description..."
                />
              </Form.Group>

              {loading ? (
                <Button
                  variant="danger"
                  disabled
                  className="d-flex float-right"
                >
                  <Spinner
                    // variant="warning"
                    // as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-1"
                  />
                  Adding...
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className="float-right"
                  // onClick={handleClose}
                >
                  Add Entry
                </Button>
              )}
              <Button
                variant="danger"
                className="float-right mr-1"
                onClick={handleClose}
              >
                Close
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DevlogAddFormModal;
