const express = require("express");
const {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController");

const router = express.Router();

// GET all workouts
router.get("/", getAllWorkouts);

// POST single workout
router.post("/", createWorkout);

// GET single workout
router.get("/:id", getSingleWorkout);

// DELETE single workout
router.delete("/:id", deleteWorkout);

// UPDATE single workout
router.patch("/:id", updateWorkout);

module.exports = router;
