import express from "express";
import crypto from "node:crypto";
import {
  validateExercise,
  validatePartialExercise,
} from "../schemas/exercises";
import workouts from "../data/workouts.json";
import exercises from "../data/exercises.json";

const app = express();
app.use(express.json());
app.disable("x-powered-by");

const PORT: string | number = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("workouts");
});

app.get("/workouts", (req, res) => {
  const { category } = req.query;
  if (category) {
    const filteredWorkouts = workouts.filter((workout) =>
      workout.category.some(
        (c) => c.toLowerCase() === category.toString().toLowerCase(),
      ),
    );
    return res.json(filteredWorkouts);
  }
  res.json(workouts);
});

app.get("/workouts/:id", (req, res) => {
  const { id } = req.params;
  const workout = workouts.find((workout) => workout.id === id);
  if (workout) return res.json(workout);
  res.status(404).json({ message: "workout not found" });
});

app.get("/exercises", (req, res) => {
  const { group } = req.query;
  if (group) {
    const filteredExercises = exercises.filter((exercise) =>
      exercise.muscleGroup.some(
        (mg) => mg.toLowerCase() === group.toString().toLowerCase(),
      ),
    );
    return res.json(filteredExercises);
  }
  res.json(exercises);
});

app.get("/exercises/:id", (req, res) => {
  const { id } = req.params;
  const exercise = exercises.find((exercise) => exercise.id === id);
  if (exercise) return res.json(exercise);
  res.status(404).json({ message: "exercise not found" });
});

app.post("/exercises", (req, res) => {
  const result = validateExercise(req.body);

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const newExercise: any = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  exercises.push(newExercise);
  res.status(201).json(newExercise);
});

app.patch("/exercises/:id", (req, res) => {
  const result = validatePartialExercise(req.body);

  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const exerciseIndex = exercises.findIndex((exercise) => exercise.id === id);

  if (exerciseIndex === -1)
    return res.status(404).json({ message: "exercise not found" });

  const updateExercise = {
    ...exercises[exerciseIndex],
    ...result.data,
  };

  exercises[exerciseIndex] = updateExercise;
  return res.json(updateExercise);
});

app.delete("/exercises/:id", (req, res) => {
  const { id } = req.params;
  const exerciseIndex = exercises.findIndex((exercise) => exercise.id === id);

  if (exerciseIndex === -1) {
    return res.status(404).json({ message: "exercise not found" });
  }

  exercises.splice(exerciseIndex, 1);

  return res.json({ message: "exercise deleted" });
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
