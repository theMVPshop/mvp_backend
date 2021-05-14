import React from "react";
import { Container, Button } from "react-bootstrap";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function TimelineElement({ todos, handleClick, removeItem }) {
  return (
    <Container style={{ backgroundColor: "lightslategray" }} className="p-12">
      <VerticalTimeline>
        {todos.map((todo) => (
          <VerticalTimelineElement
            key={todo.id}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "#20B2AA",
              color: "lightyellow",
            }}
            contentArrowStyle={{
              borderRight: "7px solid white",
            }}
            date={todo.due_date}
            dateClassName="timeline-date"
            iconStyle={{
              background: `${
                todo.ms_status === "COMPLETED"
                  ? "mediumseagreen"
                  : todo.ms_status === "IN PROGRESS"
                  ? "darkorange"
                  : todo.ms_status === "TODO"
                  ? "firebrick"
                  : "gray"
              }`,
              color: "#eee",
            }}
            // pick the icon to show up in the middle circle for each timeline element
            // icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">{todo.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">
              {todo.subtitle}
            </h4>
            <p>{todo.description}</p>
            <Button
              variant={
                todo.ms_status === "COMPLETED"
                  ? "success"
                  : todo.ms_status === "IN PROGRESS"
                  ? "warning"
                  : todo.ms_status === "TODO"
                  ? "danger"
                  : "primary"
              }
              onClick={() => handleClick(todo)}
              value={todo.id}
              id={todo.id}
              size="sm"
            >
              {todo.ms_status}
            </Button>
            <Button
              variant="danger"
              onClick={() => removeItem(todo.id)}
              size="sm"
              className="d-flex ml-auto"
            >
              Remove
            </Button>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </Container>
  );
}

export default TimelineElement;
