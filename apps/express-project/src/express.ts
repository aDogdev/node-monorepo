import express from "express";
import workouts from "./workouts.json";

const app = express();
app.disable("x-powered-by");

const PORT: string | 3000 = process.env.PORT ?? 3000;

app.use((req, _res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>home</h1>");
});

app.get("/workouts", (req, res) => {
  res.json(workouts);
});

app.post("/workouts", (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
