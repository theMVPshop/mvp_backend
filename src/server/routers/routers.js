const express = require("express");
const usersControllers = require("../controllers/usersControllers");
const projectsControllers = require("../controllers/projectsControllers");
const milestonesControllers = require("../controllers/milestonesControllers");
const permissionsControllers = require("../controllers/permissionsControllers");
const devlogControllers = require("../controllers/devlogControllers");
const router = express.Router();
const { authenticate } = require("../middleware");

// user credentials functions (username and password)
router.post("/users/credentials", usersControllers.createUserCredentials);

// users controllers
router.get("/users", usersControllers.getAllUsers);
router.post("/users", usersControllers.createUser);
router.put("/users", usersControllers.updateRoleByUsername);

// projects controllers
router.get("/projects", projectsControllers.getAllProjects);
router.post("/projects", projectsControllers.createProject);
router.delete("/projects/:id", projectsControllers.removeProjectById);

// permissions controllers
router.get("/permissions", permissionsControllers.getAllPermissions);
router.delete("/permissions/:id", permissionsControllers.removePermission);
router.post("/permissions", permissionsControllers.addPermission);

// milestones controllers
router.get(
  "/milestones/:project_id",
  milestonesControllers.getMilestoneByProject
);
router.post("/milestones", milestonesControllers.createMilestone);
router.delete("/milestones/:id", milestonesControllers.deleteMilestoneById);
router.put("/milestones", milestonesControllers.updateMilestoneById);
router.put("/milestones/:id", milestonesControllers.updateMilestoneStatusById);

// devlog controllers
router.get("/devlog/:project_id", devlogControllers.getDevlogByProject);
router.post("/devlog", devlogControllers.createDevlog);
router.delete("/devlog/:id", devlogControllers.deleteDevlogById);
router.put("/devlog", devlogControllers.updateDevlogById);

// login
// router.post("/login", function (req, res) {
//   let { username, password } = req.body;
//   console.log(`username: ${username}, password: ${password}`);
// });

module.exports = router;
