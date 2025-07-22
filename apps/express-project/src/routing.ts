import http from "node:http";
import workouts from "./workouts.json";

function routing(): void {
  const port: string | 3000 = process.env.PORT ?? 3000;
  const server: http.Server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      const { method, url }: http.IncomingMessage = req;

      res.setHeader("Content-Type", "text/plain; charset=utf-8");

      switch (method) {
        case "GET":
          console.log("GET", req.url);

          switch (url) {
            case "/":
              res.statusCode = 200;
              return res.end("home");
            case "/workouts":
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json; charset=utf-8");
              return res.end(JSON.stringify(workouts));
            default:
              res.statusCode = 404;
              return res.end("404");
          }

        case "POST":
          console.log("POST", req.url);

          switch (url) {
            case "/workouts": {
              let body: string = "";
              req.on("data", (chunk) => {
                body += chunk;
              });
              req.on("end", () => {
                const data: unknown = JSON.parse(body);
                res.writeHead(201, {
                  "Content-Type": "application/json; charset=utf-8",
                });
                res.end(JSON.stringify(data));
              });
              break;
            }
            default:
              res.statusCode = 404;
              return res.end("404");
          }
      }
    },
  );

  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`);
  });
}

export { routing };
