// Module Import
let express = require("express");
// Express Router
let router = express.Router();

// Middleware
let auth = require("../middlewares/auth");

let UserAccountController = require("../controllers/useraccount");

router.get("/", (req, res, next) => res.status(200).json({ success: true }));

router.post("/register", UserAccountController.createUser);
router.post("/login", UserAccountController.loginAccount);


module.exports = router;