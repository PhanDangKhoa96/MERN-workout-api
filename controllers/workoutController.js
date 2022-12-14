const Workout = require("../models/workoutModel");
const mongoose = require('mongoose');

// Get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
};

// get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such result" });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({ error: "No such result" });
    }

    res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    const emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill all the required fields!", emptyFields })
    }

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such result" });
    }

    const workout = await Workout.findByIdAndDelete(id)

    if (!workout) {
        return res.status(404).json({ error: "No such result" });
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such result" });
    }

    const workout = await Workout.findByIdAndUpdate(id, { ...req.body })

    if (!workout) {
        return res.status(404).json({ error: "No such result" });
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
};
