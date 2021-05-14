import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Accordion,
  Card,
  Button,
  Form,
  Col,
  Modal,
} from "react-bootstrap";
import MilestonesProjectSelectModal from "../MilestonesProjectSelectModal";

function Devlog() {
  const localStorageCurrentUser = JSON.parse(
    localStorage.getItem("gotrue.user")
  )?.email;
  const [isMod, setIsMod] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [projectId, setCurrentProjectId] = useState(null);

  let newLog = {};

  const fetchData = async () => {
    try {
      const result = await axios.get(`/devlog/${projectId}`);
      setLogs(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorageCurrentUser &&
      axios.get("/users").then((response) => {
        setIsMod(
          response.data.find((x) => x.username === localStorageCurrentUser)
            .isModerator === 1
            ? true
            : false
        );
      });
  }, []);

  const postLog = () => {
    console.log("log", newLog);
    axios
      .post(
        `/devlog`,
        // newMilestoneRequest,
        newLog
      )
      .then(function (response) {
        console.log("post devlog response", response);
      })
      .then(() => fetchData())
      .catch(function (error) {
        console.log("post devlog error", error);
      });
  };

  const removeItem = (idx) => {
    let id = logs[idx].id;
    console.log("delete log: ", id);
    axios
      .delete(`/devlog/${id}`)
      .then(() => fetchData())
      .then(() => console.log("logs:", logs))
      .catch(function (error) {
        console.log("delete devlog error", error);
      });
  };

  // modal component code begins below and ends after first return statement
  function DevlogModal() {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState({
      title: "",
      // subtitle: "",
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
      newLog = {
        title: input.title,
        project_id: input.project_id,
        description: input.description,
        time_stamp: date,
        // subtitle: input.subtitle,
      };
      // setCounter(counter + 1);
      setInput({
        title: "",
        // subtitle: "",
        description: "",
        time_stamp: "",
        project_id: projectId,
      });
      postLog();
    };

    const handleProjectClick = (projectId) => {
      axios.get(`/milestones/${projectId}`).then((response) => {
        setLogs(response.data);
        setCurrentProjectId(projectId);
      });
    };

    return (
      <>
        <Container className="d-flex p-6 justify-content-center">
          <MilestonesProjectSelectModal
            fromMilestones={true}
            handleProjectClick={handleProjectClick}
            setActiveProject={setActiveProject}
            activeProject={activeProject}
          />
        </Container>
        {/* Only show the entry creation button if user is a moderator */}
        {isMod && (
          <Button variant="primary" onClick={handleShow}>
            Add Log Entry
          </Button>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Developer Log</Modal.Title>
          </Modal.Header>
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
                  {/* <Col xs="auto">
                    <Form.Group controlId="subtitle">
                      <Form.Label>Subtitle</Form.Label>
                      <Form.Control
                        placeholder="Subtitle..."
                        value={input.subtitle}
                        onChange={onChange}
                        name="subtitle"
                      />
                    </Form.Group>
                  </Col> */}
                  {/* <Form.Group controlId="date">
                    <Form.Label>Log Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={input.date}
                      onChange={onChange}
                      name="date"
                    />
                  </Form.Group> */}
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
        </Modal>
      </>
    );
  }
  // modal component code ends here

  return (
    <>
      <DevlogModal />
      {/* accordion starts below */}
      <Container className="p-12">
        <Accordion
          // style={{ color: "white" }}
          defaultActiveKey="0"
          className="p-12"
        >
          {logs.map((log, idx) => (
            <Card key={idx} style={{ backgroundColor: "#708090" }}>
              <Card.Header style={{ backgroundColor: "lemonchiffon" }}>
                <Accordion.Toggle
                  as={Button}
                  variant="info"
                  eventKey={`${idx}`}
                >
                  {log.title}
                </Accordion.Toggle>
                <div style={{ color: "gray" }}>{log.time_stamp}</div>
                {isMod && (
                  <Button
                    variant="danger"
                    onClick={() => removeItem(idx)}
                    size="sm"
                    className="d-flex ml-auto"
                  >
                    Remove
                  </Button>
                )}
              </Card.Header>
              <Accordion.Collapse eventKey={`${idx}`}>
                <Card.Body>{log.description}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
    </>
  );
}

export default Devlog;
