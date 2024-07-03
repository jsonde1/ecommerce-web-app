import * as expressValidator from "express-validator";

export default class UserValidator {
  static validateRegister = () => {
    try {
      return [
        expressValidator
          .body("name")
          .notEmpty()
          .isString()
          .withMessage("Your Name is required"),
        expressValidator
          .body("email")
          .notEmpty()
          .isEmail()
          .withMessage("A valid email should be provided"),
        expressValidator
          .body("phoneNumber")
          .notEmpty()
          .isString()
          .isMobilePhone("en-GB")
          .withMessage("A valid phone number should be provided"),
        expressValidator
          .body("password")
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
