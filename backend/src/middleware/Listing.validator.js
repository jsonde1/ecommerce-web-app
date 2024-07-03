import * as expressValidator from "express-validator";

export default class ListingValidator {
  static validateListing = () => {
    try {
      return [
        expressValidator
          .body("title")
          .notEmpty()
          .isString()
          .withMessage("item Name is required"),
        expressValidator
          .body("condition")
          .notEmpty()
          .withMessage("The condition of the item should be provided"),
        expressValidator
          .body("description")
          .notEmpty()
          .isString()
          .isLength({ min: 15 })
          .withMessage(
            "A description of the item should be provided with a minimum of 15 characters"
          ),
        expressValidator
          .body("price")
          .notEmpty()
          .isFloat({ min: 0 })
          .withMessage("A valid price should be provided"),
        ListingValidator.handleValidationErrors,
      ];
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  static validateLogin = () => {
    try {
      return [
        expressValidator
          .body("email")
          .notEmpty()
          .isEmail()
          .withMessage("Invalid email Provided"),
        UserValidator.handleValidationErrors,
      ];
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  static validateChangePassword = () => {
    try {
      return [
        expressValidator
          .body("newPassword")
          .notEmpty()
          .isString()
          .isLength({ min: 8 })
          .withMessage("A valid password should be provided"),
        UserValidator.handleValidationErrors,
      ];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  static handleValidationErrors = (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
}
