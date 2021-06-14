import React, { useState } from "react";
import { Spinner, Container, Modal, Button } from "react-bootstrap";
import SetRoles from "./SetRoles";

// inheriting props from Navigation.js
function SetRolesModal({ authHeader }) {
  const [show, setShow] = useState(false);
  const [modalIsLoading, setmodalIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        // variant="success"
        size="sm"
        onClick={handleShow}
        className="nav-link text-success"
        style={{ marginTop: ".5px" }}
      >
        &#123; Assign &#125;
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        scrollable
        centered
        animation
      >
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>
            {modalIsLoading ? (
              <Spinner
                as="span"
                variant="warning"
                animation="border"
                role="status"
                aria-hidden="true"
                className="ml-1"
              />
            ) : (
              "Assign Roles/Projects"
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
          <Container className="d-flex p-6 justify-content-center">
            {/* line below renders SetRoles table component */}
            <SetRoles
              authHeader={authHeader}
              setmodalIsLoading={setmodalIsLoading}
            />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SetRolesModal;
