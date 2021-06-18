import { useState } from "react";
import axios from "axios";
import { useProjects } from "../contexts/ProjectsProvider";

export default (authHeader, setmodalIsLoading) => {
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
      console.error("failed to fetch users", error);
    } finally {
      setmodalIsLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      let response = await axios.get("/permissions", authHeader);
      setPermissions(response.data);
    } catch (error) {
      console.error("fetchpermissions", error);
    } finally {
      setLoading({ permissionsLoading: false });
    }
  };

  const handleChangeRole = async (userObject) => {
    const { username, isModerator } = userObject;
    setLoading({ roleLoading: true, clickedUser: username });
    const reqBody = { isModerator: !isModerator, username };
    try {
      await axios.put("/users", reqBody, authHeader);
      await fetchUsers();
    } catch (error) {
      console.error(`failed to update ${username}'s role`, error);
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
      console.error(
        `failed to change permission for ${username} with Id#${permissionId}`,
        error
      );
    } finally {
      await fetchPermissions();
    }
    setLoading({ permissionUpdating: false });
  };

  return {
    projects,
    fetchUsers,
    fetchPermissions,
    users,
    permissions,
    loading,
    handleChangeRole,
    handleChangePermission,
  };
};
