const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMulter")
const driveController = require("../controllers/driveController")

router.post("/", upload.single("archivo"), driveController.upload_file)
router.get("/", driveController.file_list)
module.exports = router;