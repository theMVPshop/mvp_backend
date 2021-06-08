import React, { useEffect } from "react";
import axios from "axios";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import DevlogModal from "../DevlogModal";
import { useGlobal } from "../../contexts/GlobalProvider";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Devlog() {
  const {
    token,
    authHeader,
    activeProject,
    setActiveProject,
    isMod,
    projects,
  } = useGlobal();
  const [logs, setLogs] = useLocalStorage("logs", []);

  const fetchLogs = () =>
    axios
      .get(`/devlog/${activeProject}`, authHeader)
      .then((response) => setLogs(response.data))
      .catch((error) => console.log(error));

  useEffect(() => fetchLogs(), [activeProject]);

  const removeLog = (Id) => {
    const reqBody = {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: Id },
    };
    axios
      .delete(`/devlog/${Id}`, reqBody)
      .then(() => fetchLogs())
      .catch((error) => console.log("delete devlog error", error));
  };

  return (
    <div
      className="pb-3 mb-2"
      style={{
        backgroundColor: "rgba(0,0,0,.25)",
        margin: "auto",
        border: "solid 3px var(--indigo)",
        width: "40%",
        borderRadius: "30px 30px 0 0",
      }}
    >
      <div
        className="mileContainer pt-2 pb-2 mb-3"
        style={{
          backgroundColor: "var(--indigo)",
          borderRadius: "25px 25px 0 0",
          filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)",
        }}
      >
        <DevlogModal
          setActiveProject={setActiveProject}
          activeProject={activeProject}
          authHeader={authHeader}
          setLogs={setLogs}
          fetchLogs={fetchLogs}
          isMod={isMod}
        />
      </div>
      {/* accordion starts below */}
      <Container className="p-12">
        <h1 className="d-flex p-6 justify-content-center">
          {projects?.find((x) => x.id == activeProject)?.title ||
            "Please Select a Project"}
        </h1>
        <Accordion defaultActiveKey="0" className="p-12">
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
                    onClick={() => removeLog(log.id)}
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
    </div>
  );
}
