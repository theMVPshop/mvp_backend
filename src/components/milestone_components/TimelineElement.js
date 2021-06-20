import React from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useMilestones } from "../../contexts/MilestonesProvider";
import { useGlobal } from "../../contexts/GlobalProvider";

// inheriting props from Milestones.js
function TimelineElement() {
  const { activeProject } = useGlobal();
  const { milestones, loading, handleStatusChange, removeMilestone } =
    useMilestones();

  const timelineIconStyle = (milestone) => ({
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
  });

  const spinner = (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  );

  const statusButtonVariant = (milestone) =>
    milestone.ms_status === "COMPLETED"
      ? "success"
      : milestone.ms_status === "IN PROGRESS"
      ? "warning"
      : milestone.ms_status === "TODO"
      ? "danger"
      : "primary";

  return (
    <>
      {activeProject && !milestones.length && (
        <h1 className="display-4 text-center text-dark bg-warning">
          No Milestones For Current Project
        </h1>
      )}
      <Container style={{ backgroundColor: "lightslategray" }} className="p-12">
        <VerticalTimeline>
          {milestones.map((milestone) => {
            let statusButton,
              isStatusLoading,
              statusLoadingButton,
              isDeleting,
              milestoneDeletingButton,
              deleteButton;

            isStatusLoading =
              loading.loadingStatusChange &&
              loading.clickedMilestone === milestone.id;

            isDeleting =
              loading.loadingMilestones &&
              loading.clickedMilestone === milestone.id;

            statusLoadingButton = <Button variant="info">{spinner}</Button>;
            statusButton = (
              <Button
                variant={statusButtonVariant(milestone)}
                onClick={() => handleStatusChange(milestone)}
                value={milestone.id}
                id={milestone.id}
                size="sm"
              >
                {milestone.ms_status}
              </Button>
            );

            milestoneDeletingButton = (
              <Button variant="danger" className="d-flex ml-auto">
                {spinner}
              </Button>
            );
            deleteButton = (
              <Button
                variant="danger"
                onClick={() => removeMilestone(milestone.id)}
                size="sm"
                className="d-flex ml-auto"
              >
                Remove
              </Button>
            );

            return (
              <VerticalTimelineElement
                key={milestone.id}
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#20B2AA", color: "lightyellow" }}
                contentArrowStyle={{ borderRight: "7px solid white" }}
                date={milestone.due_date}
                dateClassName="timeline-date"
                iconStyle={timelineIconStyle(milestone)}
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
                {isStatusLoading ? statusLoadingButton : statusButton}
                {isDeleting ? milestoneDeletingButton : deleteButton}
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </Container>
    </>
  );
}

export default TimelineElement;
