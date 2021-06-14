import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Container, Modal, Button } from "react-bootstrap";
import SetRoles from "./SetRoles";

// inheriting props from Navigation.js
function SetRolesModal({ projects, authHeader }) {
  const [show, setShow] = useState(false);

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
            Assign Roles/Projects
            {/* {loadingPermissions && (
              <Spinner
                as="span"
                variant="warning"
                animation="border"
                role="status"
                aria-hidden="true"
                className="ml-1"
              />
            )} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
          <Container className="d-flex p-6 justify-content-center">
            {/* line below renders SetRoles component */}
            <SetRoles projects={projects} authHeader={authHeader} />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SetRolesModal;

// import React, { useState } from "react";
// import { Container, Modal, Button } from "react-bootstrap";
// import SetRoles from "./SetRoles";

// // inheriting props from AddProjectForm.js
// function SetRolesModal({ projects, authHeader }) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button
//         // variant="success"
//         size="sm"
//         onClick={handleShow}
//         className="nav-link text-success"
//         style={{ marginTop: ".5px" }}
//       >
//         Assign
//       </Button>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header className="bg-light" closeButton>
//           <Modal.Title>Assign Roles/Projects</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
//           <Container className="d-flex p-6 justify-content-center">
//             {/* line below renders SetRoles component */}
//             <SetRoles projects={projects} authHeader={authHeader} />
//           </Container>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default SetRolesModal;
