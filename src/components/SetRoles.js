import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Table, Container, Form, Button } from "react-bootstrap";
import { useProjects } from "../contexts/ProjectsProvider";

// inheriting props from AddProjectForm.js > SetRolesModal.js
function SetRoles({ projects, authHeader }) {
  // const { fetchPermissions, permissions, loadingPermissions } = useProjects();

  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickedUser, setclickedUser] = useState(null);
  // const [checked, setChecked] = useState();

  const fetchUsers = () =>
    axios
      .get("/users", authHeader)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("failed to fetch users", error));

  const fetchPermissions = () =>
    axios
      .get("/permissions", authHeader)
      .then((res) => setPermissions(res.data))
      .catch((error) => console.log("fetchpermissions", error));

  useEffect(() => {
    fetchUsers();
    fetchPermissions();
  }, [projects]);

  const handleChangeRole = async (userObject) => {
    const { username, isModerator } = userObject;
    setLoading(true);
    setclickedUser(username);
    const reqBody = { isModerator: !isModerator, username };
    try {
      await axios.put("/users", reqBody, authHeader);
      await fetchUsers();
    } catch (error) {
      console.log(`failed to update ${username}'s role`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePermission = async (
    project_id,
    username,
    permissionObj
  ) => {
    setLoading(true);
    setclickedUser(username);
    let reqBody = { username, project_id };
    let permissionId = permissionObj?.id;
    console.log(permissionObj);
    try {
      permissionObj
        ? await axios.delete(`/permissions/${permissionId}`, authHeader)
        : await axios.post("/permissions", reqBody, authHeader);
      await fetchPermissions();
    } catch (error) {
      console.log(
        `failed to change permission for ${username} with Id#${permissionId}`,
        error
      );
    } finally {
      setLoading(false);
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="m-1">{user.username}</div>
                {clickedUser === user.username && loading ? (
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
                    <div key={`inline-${type}`} className="mb-3">
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
                            id={`inline-${type}-1`}
                            checked={permissionObj}
                            onClick={() =>
                              handleChangePermission(
                                project.id,
                                user.username,
                                permissionObj
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Container, Form, Button } from "react-bootstrap";
// import { useProjects } from "../contexts/ProjectsProvider";

// // inheriting props from AddProjectForm.js > SetRolesModal.js
// function SetRoles({ projects, authHeader }) {
//   const { fetchPermissions, permissions } = useProjects();
//   const [users, setUsers] = useState([]);

//   const populateUsers = () =>
//     axios
//       .get("/users", authHeader)
//       .then((response) => setUsers(response.data))
//       .catch((error) => console.log("failed to fetch users", error));

//   useEffect(() => {
//     populateUsers();
//   }, []);

//   const handleChangeRole = (isMod, username) => {
//     const updateUserRole = async () => {
//       let reqBody = {
//         isModerator: !isMod,
//         username,
//       };
//       await axios
//         .put("/users", reqBody, authHeader)
//         .catch((error) =>
//           console.log(`failed to update ${username}'s role`, error)
//         );
//     };
//     updateUserRole().then(() => populateUsers());
//   };

//   const handleChangePermission = (
//     event,
//     project_id,
//     username,
//     permissionObj
//   ) => {
//     let reqBody = { username, project_id };
//     let permissionId = permissionObj?.id;
//     const addPermission = async () =>
//       await axios
//         .post("/permissions", reqBody, authHeader)
//         .then(() => fetchPermissions())
//         .catch((error) =>
//           console.log(`failed to add permission for ${username}`, error)
//         );
//     const removePermission = async () =>
//       await axios
//         .delete(`/permissions/${permissionId}`, authHeader)
//         .then(() => fetchPermissions())
//         .catch((error) =>
//           console.log(
//             `failed to remove permission for ${username} with Id#${permissionId}`,
//             error
//           )
//         );
//     event.target.checked ? addPermission() : removePermission();
//   };

//   return (
//     <Container>
//       <Table striped bordered hover variant="dark">
//         <thead>
//           <tr>
//             <th>Role</th>
//             <th>Permissions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>
//                 <div className="m-1">{user.username}</div>

//                 <Button
//                   variant={user.isModerator ? "success" : "warning"}
//                   onClick={() =>
//                     handleChangeRole(user.isModerator, user.username)
//                   }
//                   size="sm"
//                 >
//                   {user.isModerator ? "Moderator" : "Client"}
//                 </Button>
//               </td>
//               <td>
//                 <Form>
//                   {["checkbox"].map((type) => (
//                     <div key={`inline-${type}`} className="mb-3">
//                       {projects.map((project, idx) => {
//                         let permissionObj = permissions.find(
//                           (x) =>
//                             x.username === user.username &&
//                             x.project_id === project.id
//                         );

//                         return (
//                           <Form.Check
//                             key={project.id}
//                             inline
//                             label={project.title}
//                             type={type}
//                             id={`inline-${type}-1`}
//                             checked={permissionObj}
//                             onChange={(event) =>
//                               handleChangePermission(
//                                 event,
//                                 project.id,
//                                 user.username,
//                                 permissionObj
//                               )
//                             }
//                           />
//                         );
//                       })}
//                     </div>
//                   ))}
//                 </Form>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default SetRoles;
