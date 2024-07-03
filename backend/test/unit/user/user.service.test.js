import { expect } from "chai";
import sinon from "sinon";
import jest from "jest-mock";
import sql from "mssql";
import UserServices from "../../../src/services/User.services.js";
import Database from "../../../src/database/database.js";

describe("UserServices", () => {
  let userService;
  const config = {
    server: "localhost",
    port: 1433,
    database: "test",
    user: "test",
    password: "test",
    options: {
      encrypt: false,
    },
  };

  const database = new Database(config);
  before(() => {
    // const mockQuery = jest.fn();
    // const mockInput = jest.fn(() => ({ query: mockQuery }));
    // const mockRequest = jest.fn(() => ({ input: mockInput }));

    // jest.mock("mssql", () => ({
    //   ConnectionPool: jest.fn(() => ({
    //     request: mockRequest,
    //   })),
    //   NVarChar: jest.fn(),
    // }));
    database.connect = jest.fn().mockResolvedValue({
      poolconnection: jest.fn(() => ({
        request: mockRequest,
      })),
      query: jest.fn().mockResolvedValue({
        recordset: [0],
        recordsets: [0, 0],
      }),
      close: jest.fn(),
    });
    sql.connect = jest.fn().mockResolvedValue({
      poolconnection: jest.fn(() => ({
        request: mockRequest,
      })),
      query: jest.fn().mockResolvedValue({
        recordset: [0],
        recordsets: [0, 0],
      }),
      close: jest.fn(),
    });
  });

  beforeEach(() => {
    userService = new UserServices(database);
  });
  describe("login tests", () => {
    xit("should call query on the db", async () => {
      const findStub = sinon.stub(sql, "query");
      findStub.returns([]);
      const req = {
        body: {
          email: "josh@josh.com",
          password: "password",
        },
      };
      await userService.login(req.body);

      expect(findStub.calledOnce).to.be.true;

      findStub.restore();
    });

    xit("should return the result of calling find on the Todo model", async () => {
      const todos = [{ _id: "1", description: "Test todo" }];
      const findStub = sinon.stub(Todo, "find");
      findStub.resolves(todos);

      const result = await todoService.getTodos();

      expect(result).to.equal(todos);

      findStub.restore();
    });

    xit("should return an empty array if there are no todos", async () => {
      const todos = [];
      const findStub = sinon.stub(Todo, "find");
      findStub.returns(todos);

      const result = await todoService.getTodos();

      expect(result).to.deep.equal(todos);

      findStub.restore();
    });

    /*
                In this test suite:

                The first test case checks if Todo.find is called, and the second test case checks if the result of Todo.find is returned.
                Each test case focuses on a single behavior of the getTodos method.

                - sinon.stub(Todo, 'find') replaces the find method of the Todo model with a stub.
                - findStub.returns([]) makes the stub return an empty array when it's called.
                - new TodoService().getTodos() calls the getTodos method of the TodoService class.
                - expect(findStub.calledOnce).to.be.true asserts that the stub was called once.
                - findStub.restore() restores the original find method of the Todo model.
                - findStub.returns(todos) makes the stub return a predefined array of todos.
                - expect(result).to.equal(todos) checks that the getTodos method returns this array.

        */
  });

  describe("addTodo tests", () => {
    xit("should call save and return the result when a valid todo is added", async () => {
      const newTodo = { _id: "1", description: "Test todo" };
      const saveStub = sinon.stub(Todo.prototype, "save");
      saveStub.returns(newTodo);

      const result = await todoService.addTodo(newTodo);

      expect(result).to.equal(newTodo);

      saveStub.restore();
    });

    xit("should throw an error when save fails is added", async () => {
      const invalidTodo = { description: "" };
      const error = new Error("Invalid todo");
      const saveStub = sinon.stub(Todo.prototype, "save");
      saveStub.throws(error);

      try {
        await todoService.addTodo(invalidTodo);
        assert.fail("Expected error was not thrown");
      } catch (err) {
        expect(err).to.equal(error);
      }

      saveStub.restore();
    });
  });

  describe("editTodo tests", () => {
    xit("should call findOneAndUpdate and find and return the result when a valid id and updated todo are provided", async () => {
      const id = "1";
      const updatedTodo = { description: "Updated todo" };
      const findOneAndUpdateStub = sinon.stub(Todo, "findOneAndUpdate");
      findOneAndUpdateStub.returns(updatedTodo);
      const findStub = sinon.stub(Todo, "find");
      findStub.returns(updatedTodo);

      const result = await todoService.editTodo(updatedTodo, id);

      expect(result).to.equal(updatedTodo);

      findOneAndUpdateStub.restore();
      findStub.restore();
    });

    xit("should return null when an invalid id is provided", async () => {
      const id = "invalid";
      const updatedTodo = { description: "Updated todo" };
      const findOneAndUpdateStub = sinon.stub(Todo, "findOneAndUpdate");
      findOneAndUpdateStub.returns(null);
      const findStub = sinon.stub(Todo, "find");
      findStub.returns(null);

      const result = await todoService.editTodo(updatedTodo, id);

      expect(result).to.be.null;

      findOneAndUpdateStub.restore();
      findStub.restore();
    });
  });
});
