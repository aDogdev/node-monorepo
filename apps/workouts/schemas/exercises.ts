import z from "zod";

const exerciseSchema = z.object({
  name: z.string({
    error: "exercise name is required",
  }),
  muscleGroup: z.array(
    z.enum([
      "chest",
      "shoulders",
      "triceps",
      "back",
      "biceps",
      "traps",
      "forearms",
      "quadriceps",
      "glutes",
      "hamstrings",
      "calves",
      "abs",
    ]),
  ),
  equipment: z.array(
    z.enum([
      "none",
      "smith machine",
      "parallel bars",
      "dumbbells",
      "bench",
      "cable machine",
      "pull-up bar",
      "preacher bench",
      "shrug machine",
      "hack squat machine",
      "leg curl machine",
      "leg extension machine",
      "calf raise machine",
    ]),
  ),
  description: z.string().optional(),
});

function validateExercise(object: unknown) {
  return exerciseSchema.safeParse(object);
}

function validatePartialExercise(object: unknown) {
  return exerciseSchema.partial().safeParse(object);
}

export { validateExercise, validatePartialExercise };
