import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Table, Container, Form, Button } from "react-bootstrap";
import { useProjects } from "../contexts/ProjectsProvider";

// inheriting props from AddProjectForm.js > SetRolesModal.js
function SetRoles({ projects, authHeader }) {
  const { fetchPermissions, permissions } = useProjects();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const populateUsers = () =>
    axios
      .get("/users", authHeader)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("failed to fetch users", error));

  useEffect(() => populateUsers(), []);

  const handleChangeRole = async (isMod, username) => {
    setLoading(true);
    const reqBody = {
      isModerator: !isMod,
      username,
    };
    try {
      await axios.put("/users", reqBody, authHeader);
      await populateUsers();
      setLoading(false);
    } catch (error) {
      console.log(`failed to update ${username}'s role`, error);
      setLoading(false);
    }
  };

  const handleChangePermission = async (
    event,
    project_id,
    username,
    permissionObject
  ) => {
    const reqBody = { username, project_id };
    const permissionId = permissionObject?.id;
    try {
      event.target.checked
        ? await axios.post("/permissions", reqBody, authHeader)
        : await axios.delete(`/permissions/${permissionId}`, authHeader);
      await fetchPermissions();
    } catch (error) {
      console.log(
        `failed to remove permission for ${username} with Id#${permissionId}`,
        error
      );
    }
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
          {loading && (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="m-1">{user.username}</div>
                <Button
                  key={user.id}
                  variant={user.isModerator ? "success" : "warning"}
                  onClick={() =>
                    handleChangeRole(user.isModerator, user.username)
                  }
                  size="sm"
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
