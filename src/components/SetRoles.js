import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button } from "react-bootstrap";

function SetRoles({ projects }) {
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    axios.get("/users", authHeader).then((response) => {
      setUsers(response.data);
    });
    axios.get("/permissions", authHeader).then((response) => {
      setPermissions(response.data);
    });
  }, []);

  const handleChangeRole = (isMod, username) => {
    axios
      .put(
        "/users",
        {
          isModerator: !isMod,
          username,
        },
        authHeader
      )
      .then(() => {
        axios.get("/users", authHeader).then((response) => {
          setUsers(response.data);
        });
      });
  };

  const handleChangePermission = (
    e,
    project_id,
    username,
    permissionObject
  ) => {
    let permissionId = permissionObject && permissionObject.id;
    e.target.checked
      ? axios
          .post(
            "/permissions",
            {
              username,
              project_id,
            },
            authHeader
          )
          .then(() => {
            axios.get("/permissions", authHeader).then((response) => {
              setPermissions(response.data);
            });
          })
      : axios.delete(`/permissions/${permissionId}`, authHeader).then(() => {
          axios.get("/permissions", authHeader).then((response) => {
            setPermissions(response.data);
          });
        });
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
                            onChange={(e) =>
                              handleChangePermission(
                                e,
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
