import express from "express";
import cors from "cors";

export default class Server {
  #app;
  #host;
  #port;
  #routers = [];
  #server;

  constructor(port, host, routers) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
    this.#server = null;
    this.#routers = routers;
  }

  getApp = () => {
    return this.#app;
  };

  start() {
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      console.log(`Server is listening on http://${this.#host}:${this.#port}`);
    });
    this.#app.use(cors());
    this.#app.use(express.json({ limit: "50mb" }));
    //for loop allows easy expansion of routers
    for (const router of this.#routers)
      this.#app.use(router.startRoute, router.router);
  }

  close() {
    this.#server?.close();
  }
}
