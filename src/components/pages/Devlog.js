import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import DevlogModal from "../DevlogModal";

function Devlog() {
  let cachedActiveProject = parseInt(localStorage.getItem("activeProject"));
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [isMod, setIsMod] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeProject, setActiveProject] = useState(cachedActiveProject);
  const [projectId, setProjectId] = useState(cachedActiveProject);

  useEffect(() => {
    user &&
      axios.get("/users", authHeader).then((response) => {
        setIsMod(
          response.data.find((x) => x.username === user).isModerator === 1
            ? true
            : false
        );
      });
  }, []);

  const removeItem = (Id) => {
    axios
      .delete(
        `/devlog/${Id}`,
        {
          data: {
            id: Id,
          },
        },
        authHeader
      )
      .then(() => {
        axios.get(`/devlog/${projectId}`, authHeader).then((response) => {
          setInput({
            title: "",
            description: "",
            time_stamp: "",
          });
          setLogs(response.data);
        });
      })
      .catch((error) => console.log("delete devlog error", error));
  };

  return (
    <>
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
            projectId={projectId}
            setProjectId={setProjectId}
            setActiveProject={setActiveProject}
            activeProject={activeProject}
            authHeader={authHeader}
            setLogs={setLogs}
          />
          {/* accordion starts below */}
        </div>
        <Container className="p-12">
          <Accordion defaultActiveKey="0" className="p-12">
            {logs.map((log, idx) => (
              <Card key={idx} style={{ backgroundColor: "#708090" }}>
                <Card.Header style={{ backgroundColor: "lemonchiffon" }}>
                  <Accordion.Toggle as={Button} variant="info" eventKey={idx}>
                    {log.title}
                  </Accordion.Toggle>
                  <div style={{ color: "gray" }}>{log.time_stamp}</div>
                  {isMod && (
                    <Button
                      variant="danger"
                      onClick={() => removeItem(log.id)}
                      size="sm"
                      className="d-flex ml-auto"
                    >
                      Remove
                    </Button>
                  )}
                </Card.Header>
                <Accordion.Collapse eventKey={idx}>
                  <Card.Body>{log.description}</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </Container>
      </div>
    </>
  );
}

export default Devlog;
