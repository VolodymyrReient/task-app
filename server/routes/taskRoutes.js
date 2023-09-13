const express = require("express");
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");
const validate = require("../utils/validate");
const {
  сreateTaskDtoSchema,
  updateTaskDtoSchema,
} = require("../validation/taskSchema");

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(validate(сreateTaskDtoSchema), createTask);

router.route("/stats").get(getTaskStats);

router
  .route("/:id")
  .get(getSingleTask)
  .patch(validate(updateTaskDtoSchema), updateTask)
  .delete(deleteTask);

module.exports = router;
