import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button } from "react-bootstrap";

// inheriting props from AddProjectForm.js > SetRolesModal.js
function SetRoles({ projects, authHeader }) {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    populateUsers();
    populateUserPermissions();
  }, []);

  const populateUsers = () =>
    axios
      .get("/users", authHeader)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("failed to fetch users", error));

  const populateUserPermissions = () =>
    axios
      .get("/permissions", authHeader)
      .then((response) => setPermissions(response.data))
      .catch((error) => console.log("failed to fetch user permissions", error));

  const handleChangeRole = (isMod, username) => {
    const updateUserRole = () => {
      const reqBody = {
        isModerator: !isMod,
        username,
      };
      axios
        .put("/users", reqBody, authHeader)
        .catch((error) =>
          console.log(`failed to update ${username}'s role`, error)
        );
    };
    updateUserRole().then(() => populateUsers());
  };

  const handleChangePermission = (
    event,
    project_id,
    username,
    permissionObject
  ) => {
    const reqBody = {
      username,
      project_id,
    };

    let permissionId = permissionObject?.id;

    const addPermission = () =>
      axios
        .post("/permissions", reqBody, authHeader)
        .catch((error) =>
          console.log(`failed to add permission for ${username}`, error)
        )
        .then(() => populateUserPermissions());

    const removePermission = () =>
      axios
        .delete(`/permissions/${permissionId}`, authHeader)
        .catch((error) =>
          console.log(
            `failed to remove permission for ${username} with Id#${permissionId}`,
            error
          )
        )
        .then(() => populateUserPermissions());

    event.target.checked ? addPermission() : removePermission();
  };

  return (
    <Container>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr>
              <td>{user.username}</td>
              <td>
                <Button
                  variant={user.isModerator ? "success" : "warning"}
                  onClick={() =>
                    handleChangeRole(user.isModerator, user.username)
                  }
                >
                  {user.isModerator ? "Moderator" : "Client"}
                </Button>
              </td>
              <td>
                <Form>
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      {projects.map((project, idx) => {
                        let permissionObject = permissions.find(
                          (x) =>
                            x.username === user.username &&
                            x.project_id === project.id
                        );

                        return (
                          <Form.Check
                            inline
                            label={project.title}
                            type={type}
                            id={`inline-${type}-1`}
                            checked={permissionObject}
                            // value={}
                            onChange={(event) =>
                              handleChangePermission(
                                event,
                                project.id,
                                user.username,
                                permissionObject
                              )
                            }
                          />
                        );
                      })}
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SetRoles;
