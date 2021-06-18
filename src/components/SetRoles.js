import React, { useEffect } from "react";
import { Spinner, Table, Container, Form, Button } from "react-bootstrap";
import useSetRoles from "../hooks/useSetRoles";

// inheriting props from AddProjectForm.js/Navigation.js > SetRolesModal.js
function SetRoles({ authHeader, setmodalIsLoading }) {
  const {
    projects,
    fetchUsers,
    fetchPermissions,
    users,
    permissions,
    loading,
    handleChangeRole,
    handleChangePermission,
  } = useSetRoles(authHeader, setmodalIsLoading);

  useEffect(() => {
    setmodalIsLoading(true);
    fetchUsers();
    fetchPermissions();
  }, [projects]);

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
                    <div key={`inline-${type}-${user.id}`}>
                      {projects.map((project) => {
                        const permissionObj = permissions.find(
                          (x) =>
                            x.username === user.username &&
                            x.project_id === project.id
                        );

                        return (
                          <>
                            {loading.clickedPermission === permissionObj?.id &&
                            loading.clickedProject === project.id &&
                            loading.clickedUser === user.username &&
                            loading.permissionUpdating ? (
                              <div
                                className="d-inline-block"
                                key={user.username + project.id}
                              >
                                <Spinner
                                  variant={permissionObj ? "danger" : "success"}
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  className="ml-1 mr-1"
                                />
                                <span className="mr-3 mb-3">
                                  {project.title}
                                </span>
                              </div>
                            ) : (
                              <Form.Check
                                key={user.username + project.id}
                                inline
                                label={project.title}
                                type={type}
                                id={`inline-${type}-${
                                  user.username + project.id
                                }`}
                                checked={permissionObj}
                                onChange={() =>
                                  handleChangePermission(
                                    project.id,
                                    user.username,
                                    permissionObj
                                  )
                                }
                              >
                                {loading.permissionsLoading && (
                                  <Spinner
                                    variant="info"
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="mr-3"
                                  />
                                )}
                              </Form.Check>
                            )}
                          </>
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
