import http from "node:http";
import net from "node:net";

function httpServer(desirePort?: number): void {
  const port: string | number = desirePort ?? process.env.PORT ?? 3000;
  const server: http.Server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      console.log("request received");
      res.end("hello world");
    },
  );

  void findAvailablePort(+port).then((port: number) => {
    server.listen(port, () => {
      console.log(`server listening on port http://localhost:${port}`);
    });
  });
}

function findAvailablePort(desirePort: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const server: net.Server = net.createServer();

    server.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE" || err.code === "EACCES") {
        resolve(findAvailablePort(0));
      } else {
        reject(err);
      }
    });

    server.listen(desirePort, () => {
      const address: string | net.AddressInfo | null = server.address();
      let port: number;

      if (address && typeof address === "object") {
        port = address.port;
      } else {
        port = desirePort;
      }
      server.close(() => resolve(port));
    });
  });
}

export { httpServer, findAvailablePort };
