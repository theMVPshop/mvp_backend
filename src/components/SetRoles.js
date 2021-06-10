import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button } from "react-bootstrap";
import { useGlobal } from "../contexts/GlobalProvider";

// inheriting props from AddProjectForm.js > SetRolesModal.js
function SetRoles({ projects, authHeader }) {
  const { fetchPermissions, permissions } = useGlobal();
  const [users, setUsers] = useState([]);

  const populateUsers = () =>
    axios
      .get("/users", authHeader)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("failed to fetch users", error));

  useEffect(() => {
    populateUsers();
  }, []);

  const handleChangeRole = (isMod, username) => {
    const updateUserRole = async () => {
      let reqBody = {
        isModerator: !isMod,
        username,
      };
      await axios
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
    let reqBody = { username, project_id };
    let permissionId = permissionObject?.id;
    const addPermission = async () =>
      await axios
        .post("/permissions", reqBody, authHeader)
        .then(() => fetchPermissions())
        .catch((error) =>
          console.log(`failed to add permission for ${username}`, error)
        );
    const removePermission = async () =>
      await axios
        .delete(`/permissions/${permissionId}`, authHeader)
        .then(() => fetchPermissions())
        .catch((error) =>
          console.log(
            `failed to remove permission for ${username} with Id#${permissionId}`,
            error
          )
        );
    event.target.checked ? addPermission() : removePermission();
  };

  return (
    <Container>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="m-1">{user.username}</div>
                <div className="m-1">
                  <Button
                    variant={user.isModerator ? "success" : "warning"}
                    onClick={() =>
                      handleChangeRole(user.isModerator, user.username)
                    }
                    size="sm"
                  >
                    {user.isModerator ? "Moderator" : "Client"}
                  </Button>
                </div>
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
                            key={project.id}
                            inline
                            label={project.title}
                            type={type}
                            id={`inline-${type}-1`}
                            checked={permissionObject}
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
