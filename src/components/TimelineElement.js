import React from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useMilestones } from "../contexts/MilestonesProvider";

// inheriting props from Milestones.js
function TimelineElement() {
  const {
    milestones,
    loadingMilestones,
    clickedMilestone,
    handleStatusChange,
    removeMilestone,
  } = useMilestones();
  return (
    <>
      {!milestones.length && (
        <h1 className="display-4 text-center text-dark bg-warning">
          No Milestones For Current Project
        </h1>
      )}
      <Container style={{ backgroundColor: "lightslategray" }} className="p-12">
        <VerticalTimeline>
          {milestones.map((milestone) => (
            <VerticalTimelineElement
              key={milestone.id}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "#20B2AA",
                color: "lightyellow",
              }}
              contentArrowStyle={{
                borderRight: "7px solid white",
              }}
              date={milestone.due_date}
              dateClassName="timeline-date"
              iconStyle={{
                background: `${
                  milestone.ms_status === "COMPLETED"
                    ? "mediumseagreen"
                    : milestone.ms_status === "IN PROGRESS"
                    ? "darkorange"
                    : milestone.ms_status === "TODO"
                    ? "firebrick"
                    : "gray"
                }`,
                color: "#eee",
              }}
              // pick the icon to show up in the middle circle for each timeline element
              // icon={<WorkIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                {milestone.title}
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                {milestone.subtitle}
              </h4>
              <p>{milestone.description}</p>
              <Button
                variant={
                  milestone.ms_status === "COMPLETED"
                    ? "success"
                    : milestone.ms_status === "IN PROGRESS"
                    ? "warning"
                    : milestone.ms_status === "TODO"
                    ? "danger"
                    : "primary"
                }
                onClick={() => handleStatusChange(milestone)}
                value={milestone.id}
                id={milestone.id}
                size="sm"
              >
                {milestone.ms_status}
              </Button>
              {loadingMilestones && clickedMilestone === milestone.id ? (
                <Button variant="danger" className="d-flex ml-auto">
                  <Spinner
                    // as="span"
                    // variant="warning"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    // className="mr-1"
                  />
                  {/* Removing... */}
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={() => removeMilestone(milestone.id)}
                  size="sm"
                  className="d-flex ml-auto"
                >
                  Remove
                </Button>
              )}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </Container>
    </>
  );
}

export default TimelineElement;
