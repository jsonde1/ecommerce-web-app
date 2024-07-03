import { Router } from "express";
import { body } from "express-validator";
import authJwt from "../middleware/authJwt.js";
import UserValidator from "../middleware/User.validator.js";
export default class UserRoutes {
  #router;
  #controller;

  constructor(controller) {
    this.#controller = controller;
    this.#router = Router();
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.#router.use((req, res, next) => {
      res.header(
        `Access-Control-Allow-Headers`,
        `auth-token, Origin, Content-Type, Accept`
      );
      next();
    });
    //this.#router.get("/users", this.#controller.getUsers);
    this.#router.post(
      "/login", //.escape()
      UserValidator.validateLogin(),
      this.#controller.loginUser
    );
    this.#router.post(
      "/register",
      UserValidator.validateRegister(),
      this.#controller.registerUser
    );
    this.#router.put(
      "/user/:id",
      [authJwt.verifyToken],
      UserValidator.validateChangePassword(),
      this.#controller.changePassword
    );
  }
  getRouter() {
    return this.#router;
  }
}
