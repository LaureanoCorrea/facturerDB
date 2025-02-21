const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");
const authMiddleware = require("../middlewares/auth");

router.get(
  "/create-invoice",
  authMiddleware.isAuthenticated,
  invoiceController.createInvoiceFromAlert
);

module.exports = router;
