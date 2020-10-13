const Exercise = require("../models/Exercise");

module.exports = {
  findAll: async function (req, res) {
    try {
      const exercises = await Exercise.find();
      res.json(exercises);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  findById: async function (req, res) {
    try {
      const exercise = await Exercise.findById(req.params.id);
      res.json(exercise);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  create: async function (req, res) {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = new Date(req.body.date);

    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });

    try {
      await newExercise.save();
      res.json("Exercise added!");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  update: async function (req, res) {
    try {
      await Exercise.updateOne(
        { _id: req.params.id },
        {
          username: req.body.username,
          description: req.body.description,
          duration: Number(req.body.duration),
          date: Date.parse(req.body.date),
        }
      );
      res.json("Exercise updated!");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
  delete: async function (req, res) {
    try {
      await Exercise.deleteOne({ _id: req.params.id });
      res.json("Exercise deleted.");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  },
};
