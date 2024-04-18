const multer = require("multer");
const Workout = require("../models/workoutModel");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const {
  createWorkouts,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "workoutpicture",
    format: async (req, file) => "png",
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const upload = multer({ storage: storage });

// require auth for all workout routes
router.use(requireAuth);
// GET ALL
router.get("/", getWorkouts);

// GET ONE
router.get("/:id", getWorkout);

// POST NEW
router.post(
  "/",
  upload.single("picture"),

  async (req, res) => {
    const { title, load, reps } = req.body;
    const file = req.file;

    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (!load) {
      emptyFields.push("load");
    }
    if (!reps) {
      emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }

    try {
      const workout = await Workout.create({
        title,
        load,
        reps,
        picture: file.path,
      });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// DELETE ONE
router.delete("/:id", deleteWorkout);

// UPDATE ONE
router.patch("/:id", updateWorkout);

module.exports = router;
