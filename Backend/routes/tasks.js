const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/", taskController.task_list);
router.post("/", taskController.task_create);
router.get("/:id", taskController.task_detail);
router.put("/:id", taskController.task_update);
router.delete("/:id", taskController.task_delete);
router.patch("/:id", taskController.task_complete);
module.exports = router;