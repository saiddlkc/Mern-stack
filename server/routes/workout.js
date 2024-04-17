const express = require("express");
const router = express.Router();
const {
  createWorkouts,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all workout routes
router.use(requireAuth);
// GET ALL
router.get("/", getWorkouts);

// GET ONE
router.get("/:id", getWorkout);

// POST NEW
router.post("/", createWorkouts);

// DELETE ONE
router.delete("/:id", deleteWorkout);

// UPDATE ONE
router.patch("/:id", updateWorkout);

module.exports = router;
