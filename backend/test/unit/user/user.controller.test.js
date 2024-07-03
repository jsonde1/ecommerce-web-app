import { expect } from "chai";
import sinon from "sinon";

import UserController from "../../../src/controller/user.controller.js";

describe("UserController", () => {
  let userController;
  let userServices;
  let req;
  let res;

  beforeEach(() => {
    userServices = {
      login: sinon.stub(),
      register: sinon.stub(),
      changePassword: sinon.stub(),
    };
    userController = new UserController(userServices);
    req = {
      body: {},
      // params: { id: "13" },
    };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.spy(),
    };
  });

  describe("Login tests", () => {
    it("should get the user from the service and return them ", async () => {
      // Arrange
      const user = {
        id: "1",
        Name: "John Doe",
        Email: "johndoe@gmail.com",
        PhoneNumber: "079564628323",
        Password: "password",
      };
      userServices.login.resolves(user);

      // Act
      await userController.loginUser(req, res);

      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({ message: `Login Success`, user })).to.be
        .true;
    });

    xit("should send a 401 response if user cannot be found", async () => {
      const testError = new Error("User not found");
      userServices.login.rejects(testError);

      await userController.loginUser(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.send.calledWith({ message: testError.message })).to.be.true;
    });

    it("should send 500 response if there is a system error", async () => {
      const testError = new Error("System error");
      userServices.login.rejects(testError);

      await userController.loginUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.send.calledWith({ message: "System error, please try again later" })
      ).to.be.true;
    });
  });

  describe("Register tests", () => {
    it("should return rows affected and 201 status when user created ", async () => {
      // Arrange
      const rowsAffected = 1;
      userServices.register.resolves(rowsAffected);

      // Act
      await userController.registerUser(req, res);

      // Assert
      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.send.calledWith({
          message: `Account has been successfully created`,
          rowsAffected,
        })
      ).to.be.true;
    });

    it("should send a 400 response if user cannot be created", async () => {
      const testError = new Error("User not created");
      req.body = {
        name: "John Doe",
        email: "",
      };
      userServices.register.rejects(testError);
      await userController.registerUser(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith({ message: "User not created" })).to.be.true;
    });

    xit("should send 500 response if there is a system error", async () => {
      const testError = new Error("System error");
      userServices.login.rejects(testError);

      await userController.loginUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(
        res.send.calledWith({ message: "System error, please try again later" })
      ).to.be.true;
    });
  });
});
