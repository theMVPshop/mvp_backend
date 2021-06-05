import axios from "axios";

// Devlog methods //
// if someone is logged in, this will check to see if they are a moderator and store it in a useState hook (line 15) as a boolean
const checkModPrivilege = () =>
  user &&
  axios.get("/users", authHeader).then((response) => {
    setIsMod(
      response.data.find((x) => x.username === user)?.isModerator === 1
        ? true
        : false
    );
  });

const fetchLogs = (Id) =>
  axios
    .get(`/devlog/${Id || projectId}`, authHeader)
    .then((response) => setLogs(response.data))
    .catch((error) => console.log(error));

const removeLog = (Id) => {
  const reqBody = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: Id,
    },
  };
  axios
    .delete(`/devlog/${Id}`, reqBody)
    .then(() => fetchLogs())
    .catch((error) => console.log("error deleting devlog", error));
};

// Milestones.js methods
const fetchMilestones = () =>
  axios
    .get(`/milestones/${currentProjectId}`, authHeader)
    .then((response) => setTodos(response.data))
    .catch((error) => console.log(error));

const populateProjects = () =>
  axios
    .get("/projects", authHeader)
    .then((response) => setProjects(response.data))
    .catch((error) => console.log(error));

export {
  checkModPrivilege,
  fetchLogs,
  removeLog,
  fetchMilestones,
  populateProjects,
};
