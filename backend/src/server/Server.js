import express from "express";
import cors from "cors";

export default class Server {
  #app;
  #port;
  #routers = [];
  #server;

  constructor(port, routers) {
    this.#app = express();
    this.#port = port;
    this.#server = null;
    this.#routers = routers;
  }

  getApp = () => {
    return this.#app;
  };

  start() {
    this.#server = this.#app.listen(this.#port, () => {
      console.log(`Server is listening on ${this.#port}`);
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
