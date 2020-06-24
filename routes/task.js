// Module Import
let express = require("express");
// Express Router
let router = express.Router();

// Middleware
let auth = require("../middlewares/auth");
let task = require("../controllers/task");

router.get("/", (req, res, next) => res.status(200).json({ success: true }));

router.post("/assign-task",auth.apiKeyAuth,task.assignTask);

router.get("/gettasks", auth.apiKeyAuth, task.fetchtask);


module.exports = router;
