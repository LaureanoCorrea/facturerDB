const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

router.get(
  "/profile",
  authMiddleware.isAuthenticated,
  userController.getUserData
);
router.post("/set", authMiddleware.isAuthenticated, userController.setTeamName);

module.exports = router;
