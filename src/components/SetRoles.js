import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Table, Container, Form, Button } from "react-bootstrap";
import { useProjects } from "../contexts/ProjectsProvider";

// inheriting props from AddProjectForm.js/Navigation.js > SetRolesModal.js
function SetRoles({ authHeader, setmodalIsLoading }) {
  const { projects } = useProjects();

  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [loading, setLoading] = useState({
    roleLoading: false,
    permissionsLoading: true,
    permissionUpdating: true,
    clickedUser: null,
    clickedPermission: null,
    clickedProject: null,
  });

  const fetchUsers = async () => {
    try {
      let response = await axios.get("/users", authHeader);
      setUsers(response.data);
    } catch (error) {
      console.log("failed to fetch users", error);
    } finally {
      setmodalIsLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      let response = await axios.get("/permissions", authHeader);
      setPermissions(response.data);
    } catch (error) {
      console.log("fetchpermissions", error);
    } finally {
      setLoading({ permissionsLoading: false });
    }
  };

  useEffect(() => {
    setmodalIsLoading(true);
    fetchUsers();
    fetchPermissions();
  }, [projects]);

  const handleChangeRole = async (userObject) => {
    const { username, isModerator } = userObject;
    setLoading({ roleLoading: true });
    setLoading({ clickedUser: username });
    const reqBody = { isModerator: !isModerator, username };
    try {
      await axios.put("/users", reqBody, authHeader);
      await fetchUsers();
    } catch (error) {
      console.log(`failed to update ${username}'s role`, error);
    } finally {
      setLoading({ roleLoading: false });
    }
  };

  const handleChangePermission = async (
    project_id,
    username,
    permissionObj
  ) => {
    let permissionId = permissionObj?.id;
    setLoading({
      permissionUpdating: true,
      clickedPermission: permissionId,
      clickedProject: project_id,
      clickedUser: username,
    });
    try {
      let reqBody = { username, project_id };
      permissionObj
        ? await axios.delete(`/permissions/${permissionId}`, authHeader)
        : await axios.post("/permissions", reqBody, authHeader);
    } catch (error) {
      console.log(
        `failed to change permission for ${username} with Id#${permissionId}`,
        error
      );
    } finally {
      await fetchPermissions();
    }
    setLoading({ permissionUpdating: false });
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
                {loading.clickedUser === user.username &&
                loading.roleLoading ? (
                  <Button variant="danger" disabled className="d-flex">
                    <Spinner
                      // variant="warning"
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-1"
                    />
                    {/* Updating */}
                  </Button>
                ) : (
                  <Button
                    variant={user.isModerator ? "success" : "warning"}
                    onClick={() => handleChangeRole(user)}
                    size="sm"
                  >
                    {user.isModerator ? "Moderator" : "Client"}
                  </Button>
                )}
              </td>
              <td>
                <Form>
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}-${user.id}`} className="mb-3">
                      {projects.map((project) => {
                        const permissionObj = permissions.find(
                          (x) =>
                            x.username === user.username &&
                            x.project_id === project.id
                        );

                        return (
                          <Form.Check
                            key={user.username + project.id}
                            inline
                            label={project.title}
                            type={type}
                            id={`inline-${type}-${user.username + project.id}`}
                            checked={permissionObj}
                            onChange={() =>
                              handleChangePermission(
                                project.id,
                                user.username,
                                permissionObj
                              )
                            }
                          >
                            {loading.permissionsLoading ? (
                              <Spinner
                                variant="info"
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="mr-3"
                              />
                            ) : (
                              loading.clickedPermission === permissionObj?.id &&
                              loading.clickedProject === project.id &&
                              loading.clickedUser === user.username &&
                              loading.permissionUpdating && (
                                <Spinner
                                  variant={permissionObj ? "danger" : "success"}
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  className="mr-3"
                                />
                              )
                            )}
                          </Form.Check>
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
