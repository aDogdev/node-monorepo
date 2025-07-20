import http from "node:http";
import fs from "node:fs/promises";

function httpServer(): void {
  const port: string | 3000 = process.env.PORT ?? 3000;

  const server: http.Server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");

      if (req.url === "/") {
        res.statusCode = 200;
        res.end("home");
      } else if (req.url === "/profile") {
        fs.readFile("./public/avatar.png")
          .then((data: Buffer) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/png");
            res.end(data);
          })
          .catch((_e: Error) => {
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
    },
  );

  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`);
  });
}

export { httpServer };
