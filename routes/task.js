// Module Import
let express = require("express");
// Express Router
let router = express.Router();

// Middleware
let auth = require("../middlewares/auth");
let task = require("../controllers/task");

router.get("/", (req, res, next) => res.status(200).json({ success: true }));
router.get("/gettasks", auth.apiKeyAuth, task.fetchtask);
router.post("/assign-task",auth.apiKeyAuth,task.assignTask);
router.delete('/delete/:id', auth.apiKeyAuth, task.deleteById);

module.exports = router;














