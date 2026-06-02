const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMulter")
const driveController = require("../controllers/driveController")

router.post("/", upload.single("archivo"), driveController.upload_file)
router.get("/", driveController.file_list)
router.delete("/:id", driveController.file_delete)
router.get("/:id/download", driveController.file_download)
module.exports = router;