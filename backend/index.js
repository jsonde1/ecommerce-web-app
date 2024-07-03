import { config } from "./config/Config.js";
import Database from "./src/database/database.js";
import UserRoutes from "./src/routes/user.routes.js";
import UserController from "./src/controller/user.controller.js";
import Server from "./src/server/Server.js";
import UserServices from "./src/services/User.services.js";
import ListingServices from "./src/services/Listing.services.js";
import ListingRoutes from "./src/routes/listing.routes.js";
import ListingController from "./src/controller/listing.controller.js";

const port = process.env.port || 3000;
const routers = [];
const database = new Database(config);

const userRoutes = new UserRoutes(
  new UserController(new UserServices(database))
);
const userRouter = {
  router: userRoutes.getRouter(),
  startRoute: "/",
};
const listingRoutes = new ListingRoutes(
  new ListingController(new ListingServices(database))
);
const listingRouter = {
  router: listingRoutes.getRouter(),
  startRoute: "/listings",
};
routers.push(userRouter, listingRouter);
const server = new Server(port, process.env.HOST, routers);
server.start();
