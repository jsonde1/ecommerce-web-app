import { Router } from "express";
import { body } from "express-validator";
import authJwt from "../middleware/authJwt.js";
import ListingValidator from "../middleware/Listing.validator.js";
export default class ListingRoutes {
  #router;
  #controller;

  constructor(controller) {
    this.#controller = controller;
    this.#router = Router();
    this.#initialiseRoutes();
  }
  //make requests to specific routes require a token
  #initialiseRoutes() {
    this.#router.use((req, res, next) => {
      res.header(
        `Access-Control-Allow-Headers`,
        `auth-token, Origin, Content-Type, Accept`
      );
      next();
    });
    this.#router.get("/", this.#controller.getListings);
    this.#router.get(
      "/provisional",
      [authJwt.verifyToken],
      [authJwt.adminCheck],
      this.#controller.getProvisionalListings
    );
    this.#router.get("/search/:query", this.#controller.getListingsbyQuery);
    this.#router.get(
      "/:id",
      [authJwt.verifyToken],
      this.#controller.getSellerListings
    );
    this.#router.put(
      "/edit",
      [authJwt.verifyToken],
      this.#controller.editListing
    );
    this.#router.delete(
      "/delete/:id",
      [authJwt.verifyToken],
      this.#controller.deleteListing
    );
    this.#router.delete(
      "/delete/provisional/:id",
      [authJwt.verifyToken],
      [authJwt.adminCheck],
      this.#controller.deleteProvisionalListing
    );
    this.#router.post(
      "/add/:id",
      [authJwt.verifyToken],
      [authJwt.adminCheck],
      this.#controller.addListing
    );
    this.#router.post(
      "/add/provisional/:id",
      [authJwt.verifyToken],
      ListingValidator.validateListing(),
      this.#controller.addProvisionalListing
    );
  }
  getRouter() {
    return this.#router;
  }
}
