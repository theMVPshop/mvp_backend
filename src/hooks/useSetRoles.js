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
      let { data } = await axios.get("/users", authHeader);
      setUsers(data);
    } catch (e) {
      console.error("failed to fetch users", e);
    } finally {
      setmodalIsLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      let { data } = await axios.get("/permissions", authHeader);
      setPermissions(data);
    } catch (e) {
      console.error("fetchpermissions", e);
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
    } catch (e) {
      console.error(`failed to update ${username}'s role`, e);
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
    } catch (e) {
      console.error(
        `failed to change permission for ${username} with Id#${permissionId}`,
        e
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
