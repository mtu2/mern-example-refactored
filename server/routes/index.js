const router = require("express").Router();
const exerciseRoutes = require("./exerciseRoutes");
const userRoutes = require("./userRoutes");

// API routes
router.use("/api/exercise", exerciseRoutes);
router.use("/api/user", userRoutes);

module.exports = router;
