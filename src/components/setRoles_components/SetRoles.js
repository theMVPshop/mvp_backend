import React, { useEffect } from "react";
import { Spinner, Table, Container, Form, Button } from "react-bootstrap";
import useSetRoles from "../../hooks/useSetRoles";

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
  }, []);

  const loadingButton = (
    <Button variant="danger" disabled className="d-flex">
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="mr-1"
      />
    </Button>
  );

  const spinnerProps = {
    as: "span",
    size: "sm",
    role: "status",
    ariaHidden: "true",
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
          {users.map((user) => {
            let isRoleLoading, roleButton;

            isRoleLoading =
              loading.clickedUser === user.username && loading.roleLoading;

            roleButton = (
              <Button
                variant={user.isModerator ? "success" : "warning"}
                onClick={() => handleChangeRole(user)}
                size="sm"
              >
                {user.isModerator ? "Moderator" : "Client"}
              </Button>
            );

            return (
              <tr key={user.id}>
                <td>
                  <div className="m-1">{user.username}</div>
                  {isRoleLoading ? loadingButton : roleButton}
                </td>
                <td>
                  <Form>
                    {["checkbox"].map((type) => (
                      <div key={`inline-${type}-${user.id}`}>
                        {projects.map((project) => {
                          let permissionObj,
                            isPermissionUpdating,
                            permissionSpinner,
                            permissionFormCheck;

                          permissionObj = permissions.find(
                            (permission) =>
                              permission.username === user.username &&
                              permission.project_id === project.id
                          );

                          isPermissionUpdating =
                            loading.clickedPermission === permissionObj?.id &&
                            loading.clickedProject === project.id &&
                            loading.clickedUser === user.username &&
                            loading.permissionUpdating;

                          permissionSpinner = (
                            <div
                              className="d-inline-block"
                              key={user.username + project.id}
                            >
                              <Spinner
                                {...spinnerProps}
                                variant={permissionObj ? "danger" : "success"}
                                animation="border"
                                className="mx-1"
                              />
                              <span className="mr-3 mb-3">{project.title}</span>
                            </div>
                          );

                          permissionFormCheck = (
                            <Form.Check
                              inline
                              key={user.username + project.id}
                              id={`inline-${type}-${
                                user.username + project.id
                              }`}
                              checked={permissionObj}
                              type={type}
                              label={project.title}
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
                                  {...spinnerProps}
                                  variant="info"
                                  animation="grow"
                                  className="mr-3"
                                />
                              )}
                            </Form.Check>
                          );

                          return isPermissionUpdating
                            ? permissionSpinner
                            : permissionFormCheck;
                        })}
                      </div>
                    ))}
                  </Form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default SetRoles;
