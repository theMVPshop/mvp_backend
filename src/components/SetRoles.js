import React from "react";
import { Spinner, Table, Container, Form, Button } from "react-bootstrap";

// inheriting props from AddProjectForm.js > SetRolesModal.js
function SetRoles({
  projects,
  users,
  permissions,
  handleChangePermission,
  handleChangeRole,
  clickedUser,
  loading,
}) {
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
                {clickedUser == user.username && loading ? (
                  <Button variant="danger btn-block" disabled>
                    <Spinner
                      // variant="warning"
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Updating
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
                    <div key={`inline-${type}`} className="mb-3">
                      {projects.map((project) => {
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
