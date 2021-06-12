import React from "react";
import { Table, Container, Form, Button } from "react-bootstrap";

// inheriting props from AddProjectForm.js > SetRolesModal.js
function SetRoles({
  projects,
  users,
  permissions,
  handleChangePermission,
  handleChangeRole,
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
