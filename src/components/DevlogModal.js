import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Form, Modal } from "react-bootstrap";
import MilestonesProjectSelectModal from "./MilestonesProjectSelectModal";

function DevlogModal({
  projectId,
  setProjectId,
  setLogs,
  setActiveProject,
  activeProject,
  authHeader,
}) {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    time_stamp: "",
    project_id: projectId,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString();
    axios
      .post(
        "/devlog",
        {
          title: input.title,
          description: input.description,
          project_id: projectId,
          time_stamp: date,
        },
        authHeader
      )
      .then(() => {
        axios.get(`/devlog/${projectId}`, authHeader).then((response) => {
          setLogs(response.data);
          setInput({
            title: "",
            description: "",
            time_stamp: "",
          });
        });
      })
      .catch((error) => console.log(error));
  };

  const handleProjectClick = (projectId) => {
    axios.get(`/devlog/${projectId}`, authHeader).then((response) => {
      localStorage.setItem("activeProject", projectId);
      setActiveProject(projectId);
      setProjectId(projectId);
      setLogs(response.data);
    });
  };

  return (
    <>
      {/* devLog render */}
      <Container className="d-flex p-6 justify-content-center">
        <MilestonesProjectSelectModal
          fromMilestones={true}
          handleProjectClick={handleProjectClick}
          setActiveProject={setActiveProject}
          activeProject={activeProject}
        />
      </Container>
      {/* Only show the entry creation button if user is a moderator */}
      {/* {isMod && (
          <Button variant="primary" onClick={handleShow}>
            Add Log Entry
          </Button>
        )} */}
      {/* testing purposes only */}
      <Button variant="primary" onClick={handleShow}>
        Add Log Entry
      </Button>
      <Modal show={show} onHide={handleClose}>
        <div
          className="devlogContainer pb-3 mb-2"
          style={{
            backgroundColor: "rgba(0,0,0,.25)",
            margin: "auto",
            border: "solid 3px var(--indigo)",
            width: "100%",
            borderRadius: "30px 30px 0 0",
          }}
        >
          <div
            className="pt-2 pb-2 mb-3"
            style={{
              backgroundColor: "var(--indigo)",
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
                <Button variant="primary" type="submit" className="float-right">
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
