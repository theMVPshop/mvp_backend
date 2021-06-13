import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Container, Modal, Button } from "react-bootstrap";
import SetRoles from "./SetRoles";
import { useProjects } from "../contexts/ProjectsProvider";

// inheriting props from Navigation.js
function SetRolesModal({ projects, authHeader }) {
  const { fetchPermissions, permissions, loadingPermissions } = useProjects();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickedUser, setclickedUser] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUsers = () =>
    axios
      .get("/users", authHeader)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("failed to fetch users", error));

  useEffect(() => fetchUsers(), [permissions]);

  const handleChangeRole = async (userObject) => {
    const { username, isModerator } = userObject;
    setLoading(true);
    setclickedUser(username);
    const reqBody = { isModerator, username };
    try {
      await axios.put("/users", reqBody, authHeader);
      await fetchUsers();
      setLoading(false);
    } catch (error) {
      console.log(`failed to update ${username}'s role`, error);
      // setLoading(false);
    }
  };

  const handleChangePermission = async (
    event,
    project_id,
    username,
    permissionObject
  ) => {
    setLoading(true);
    setclickedUser(username);
    const reqBody = { username, project_id };
    const permissionId = permissionObject?.id;
    try {
      event.target.checked
        ? await axios.post("/permissions", reqBody, authHeader)
        : await axios.delete(`/permissions/${permissionId}`, authHeader);
      await fetchPermissions();
      setLoading(false);
    } catch (error) {
      console.log(
        `failed to remove permission for ${username} with Id#${permissionId}`,
        error
      );
      setLoading(false);
    }
  };

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
        className="mh-75"
        scrollable
        centered
        animation
      >
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>
            Assign Roles/Projects
            {loadingPermissions && (
              <Spinner
                as="span"
                variant="warning"
                animation="border"
                role="status"
                aria-hidden="true"
                className="ml-1"
              />
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
          <Container className="d-flex p-6 justify-content-center">
            {/* line below renders SetRoles component */}
            <SetRoles
              projects={projects}
              loading={loading}
              users={users}
              permissions={permissions}
              handleChangePermission={handleChangePermission}
              handleChangeRole={handleChangeRole}
              clickedUser={clickedUser}
              loading={loading}
            />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SetRolesModal;
