import React from "react";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import DevlogAddFormModal from "../DevlogAddFormModal";
import { useGlobal } from "../../contexts/GlobalProvider";
import { useDevlog } from "../../contexts/DevlogProvider";
import { useProjects } from "../../contexts/ProjectsProvider";
import ProjectSelectModal from "../ProjectSelectModal";

export default function Devlog() {
  const { authHeader, activeProject, isMod } = useGlobal();
  const { permissions, activeProjectTitle } = useProjects();
  const { logs, fetchLogs, removeLog } = useDevlog();

  return (
    <Container
      className="pb-3 mb-2 m-auto"
      style={{
        backgroundColor: "rgba(0,0,0,.25)",
        border: "solid 3px var(--blue)",
        borderRadius: "30px 30px 0 0",
      }}
    >
      <div
        className="mileContainer pt-2 pb-2 mb-3"
        style={{
          borderRadius: "25px 25px 0 0",
          filter: "drop-shadow(0 10px 0.05rem rgba(0,0,0,.55)",
        }}
      >
        <div className="d-flex row">
          <ProjectSelectModal asModal={true} route={"devlog"} />
          {isMod && (
            <DevlogAddFormModal
              activeProject={activeProject}
              authHeader={authHeader}
              fetchLogs={fetchLogs}
            />
          )}
        </div>
      </div>
      {/* accordion starts below */}
      <Container className="p-12">
        <h1 className="d-flex p-6 justify-content-center text-light font-weight-bolder bg-primary">
          {activeProjectTitle ||
            (permissions
              ? "Please Select a Project"
              : "Please inform your supervisor to assign you a project")}
        </h1>
        <Accordion defaultActiveKey="0" className="p-12">
          {!logs.length && (
            <h1 className="display-4 text-center text-dark bg-warning">
              No Logs For Current Project
            </h1>
          )}
          {logs.map((log, idx) => (
            <Card key={idx} className="bg-dark text-light">
              <Card.Header
                style={{ backgroundColor: "lemonchiffon" }}
                className="d-flex"
              >
                <Accordion.Toggle
                  as={Button}
                  variant="info"
                  eventKey={`${idx}`}
                  className="mr-1"
                >
                  {log.title}
                </Accordion.Toggle>
                <span className="text-primary">
                  Added:
                  <span className="text-danger"> {log.time_stamp}</span>
                </span>
                {isMod && (
                  <Button
                    variant="danger"
                    onClick={() => removeLog(log.id)}
                    size="sm"
                    className="ml-auto mb-auto"
                  >
                    X
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
    </Container>
  );
}
