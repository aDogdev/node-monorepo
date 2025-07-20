import http from "node:http";
import fs from "node:fs/promises";

function httpServer() {
  const port = process.env.PORT ?? 3000;

  const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    if (req.url === "/") {
      res.statusCode = 200;
      res.end("home");
    } else if (req.url === "/profile") {
      fs.readFile("./public/avatar.png")
        .then((data) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "image/png");
          res.end(data);
        })
        .catch((_e) => {
          res.statusCode = 500;
          res.end("internal server error");
        });
    } else if (req.url === "/workouts") {
      res.statusCode = 200;
      res.end("workouts");
    } else {
      res.statusCode = 404;
      res.end("404");
    }
  });

  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`);
  });
}

export { httpServer };
