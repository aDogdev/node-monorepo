import express from "express";

const app = express();
app.disable("x-powered-by");

const PORT: string | number = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("workouts");
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
