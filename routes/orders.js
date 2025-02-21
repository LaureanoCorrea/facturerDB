const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAdvisorNames);
router.get("/:id", orderController.getOrderDetails);
router.post("/delete-all-csvs", orderController.removeAll);

module.exports = router;
