import jwt from "jsonwebtoken";
import UserServices from "../services/User.services.js";
export default class UserController {
  #services;
  constructor(service = new UserServices()) {
    this.#services = service;
  }

  loginUser = async (req, res) => {
    const notFound = new Error("User not found");
    try {
      // const errors = validationResult(req);
      const user = await this.#services.login(req.body);
      const token = jwt.sign(
        {
          id: user.id,
          // name: user.Name,
          // email: user.Email,
          // phoneNumber: user.PhoneNumber,
          userType: user.UserType,
        },
        "process.env.JWT_SECRET.KEY", //needs to be changed to actual env variable
        { expiresIn: 1800 } //30 mins
      );
      user.token = token;
      res.status(200).send({ message: `Login Success`, user });
    } catch (error) {
      if (error.message === "invalid login credentials") {
        return res.status(401).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: `System error, please try again later`,
      });
    }
  };
  changePassword = async (req, res) => {
    try {
      if (req.body.newPassword.length < 8)
        throw new Error("New password must be 8 characters or more");
      const rowsAffected = await this.#services.changePassword(
        req.params.id,
        req.body
      );
      if (rowsAffected === 0) throw new Error("Password not updated");
      res.status(200).send({
        message: `Password has been successfully updated`,
        rowsAffected,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  };

  registerUser = async (req, res) => {
    try {
      const rowsAffected = await this.#services.register(req.body);
      if (rowsAffected === 0) throw new Error("User not created");
      res.status(201).send({
        message: `Account has been successfully created`,
        rowsAffected,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  };
}
