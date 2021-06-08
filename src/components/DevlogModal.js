import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Form, Modal } from "react-bootstrap";
import MilestonesProjectSelectModal from "./MilestonesProjectSelectModal";

// inherits props from Devlog.js
function DevlogModal({
  isMod,
  setLogs,
  setActiveProject,
  activeProject,
  authHeader,
  fetchLogs,
}) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    time_stamp: "",
    project_id: activeProject,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (event) =>
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  const clearForm = () =>
    setInput({
      title: "",
      description: "",
      time_stamp: "",
    });

  const onSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString();
    const reqBody = {
      title: input.title,
      description: input.description,
      project_id: activeProject,
      time_stamp: date,
    };
    axios
      .post("/devlog", reqBody, authHeader)
      .then(() => fetchLogs())
      .then(() => clearForm())
      .catch((error) => console.log(error));
  };

  const handleProjectClick = (Id) =>
    axios
      .get(`/devlog/${Id}`, authHeader)
      .then((response) => {
        localStorage.setItem("activeProject", Id);
        setActiveProject(Id);
        setLogs(response.data);
      })
      .catch((error) => console.log(error));

  const AddLogButton = () => (
    <Button variant="primary" onClick={handleShow}>
      Add Log Entry
    </Button>
  );

  return (
    <>
      {/* <Container className="d-flex justify-content-center"> */}
      <MilestonesProjectSelectModal
        fromMilestones={true}
        handleProjectClick={handleProjectClick}
        setActiveProject={setActiveProject}
        activeProject={activeProject}
        AddLogOnClickHandleShow={handleShow}
        AddLogButton={AddLogButton}
        isMod={isMod}
      />
      {/* {isMod && (
          <Container className="d-flex justify-content-center p-3">
            <Button variant="primary" onClick={handleShow}>
              Add Log Entry
            </Button>
          </Container>
        )} */}
      {/* </Container> */}
      <Modal show={show} onHide={handleClose}>
        <div
          className="devlogContainer pb-3 mb-2"
          style={{
            backgroundColor: "rgba(0,0,0,.25)",
            margin: "auto",
            border: "solid 3px var(--blue)",
            width: "100%",
            borderRadius: "30px 30px 0 0",
          }}
        >
          <div
            className="pt-2 pb-2 mb-3"
            style={{
              backgroundColor: "var(--blue)",
              color: "var(--light)",
              borderRadius: "25px 25px 0 0",
              filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)",
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Developer Log</Modal.Title>
            </Modal.Header>
          </div>
          <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
            <Container className="d-flex p-6 justify-content-center">
              <Form className="m-4" onSubmit={onSubmit}>
                <Form.Row>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      placeholder="Post Title..."
                      value={input.title}
                      onChange={onChange}
                      name="title"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="post">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={input.description}
                    onChange={onChange}
                    name="description"
                    placeholder="description..."
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="float-right"
                  onClick={handleClose}
                >
                  Add Entry
                </Button>
              </Form>
            </Container>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default DevlogModal;
