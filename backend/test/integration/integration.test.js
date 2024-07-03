// Configure environment
// Test database connection
// Test Server - to be able to make requests to
//  Controller
//  Router
//  Service
import { expect, use } from "chai";
import sinon from "sinon";
import supertest from "supertest";
import sql from "mssql";
import { config } from "../../config/Config.js";
import Database from "../../src/database/database.js";
import Server from "../../src/server/Server.js";
import UserRoutes from "../../src/routes/user.routes.js";
import UserServices from "../../src/services/User.services.js";
import UserController from "../../src/controller/user.controller.js";
import ListingRoutes from "../../src/routes/listing.routes.js";
import ListingServices from "../../src/services/Listing.services.js";
import ListingController from "../../src/controller/listing.controller.js";
import {
  createUsersTable,
  createListingsTable,
} from "../integration/dbqueries.js";

describe("Integration Tests", () => {
  let server;
  let userService;
  let database;
  let request;

  // Create a server and a connection to the database
  before(async () => {
    const port = process.env.port || 3000;
    const routers = [];
    database = new Database(config);
    userService = new UserServices(database);
    const userRoutes = new UserRoutes(new UserController(userService));
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
    server = new Server(port, process.env.HOST, routers);
    server.start();
    request = supertest(server.getApp());
  });

  after(async () => {});

  // Make sure that the database is in a known state BEFORE testing any requests
  beforeEach(async () => {
    await database.executeQuery(
      "DROP TABLE IF EXISTS Listings; DROP TABLE IF EXISTS Users;"
    );
    console.log("Tables cleared");
    await database.executeQuery(createUsersTable);
    await database.executeQuery(createListingsTable);
    await database.executeQuery(
      `INSERT INTO Listings ( Title, Condition, Price, Description, UserID, MainImage) VALUES( 'Test Item One', 'New', 32, 'this is a test item', 1, 'src/sadji' )`
    );
    console.log("Database populated with listings ");
    const password = `$2b$10$LbQHpx1N27ahGfSX/.WXjudPwmuJ.k.Jn/rfnL1wSN1JgUVXkYlky`;
    await database.executeQuery(
      `INSERT INTO Users ( Name, Email, PhoneNumber, Password ) VALUES( 'John Doe', 'johndoe@gmail.com', '07912345678', @password  ), ( 'Jane Doe', 'janedoe@gmail.com', '07912345678', @password  )`,
      ["password"],
      [password]
    );
    console.log("Database populated with users ");
  });

  //password for both is 'password101'
  describe("GET requests to /listings on ListingRoutes", () => {
    // Test to demo function rather than arrow function can pass test too (as long as this is bound)
    it("should respond with a 200 status code for a GET request to /listings if listings are available", async () => {
      const response = await request.get("/listings");
      expect(response.status).to.equal(200);
    });
    it("should respond with a 200 status code for a GET request to /listings/query if listings are found", async () => {
      const response = await request.get("/listings/search/test");
      expect(response.status).to.equal(200);
    });
    it("should respond with a 400 status code for a GET request to /listings/query if listings are not found", async () => {
      const response = await request.get(
        "/listings/search/wherearethelistings"
      );
      expect(response.status).to.equal(400);
    });
    it("should respond with a 200 status code for a GET request to /listings/:id if listings are  found", async () => {
      let user = {
        email: "johndoe@gmail.com",
        password: "password101",
      };
      let response = await request.post("/login").send(user);
      expect(response.status).to.equal(200);
      user = response.body.user;
      response = await request
        .get(`/listings/${user.id}`)
        .set({ "auth-token": user.token, Accept: "application/json" });
      expect(response.status).to.equal(200);
    });

    // it("should respond with a 200 status code for a GET request to /", async () => {
    //   const response = await request.get("/");
    //   expect(response.status).to.equal(200);
    // });

    // it("should respond with JSON for GET /", async () => {
    //   const response = await request.get("/");
    //   expect(response.headers["content-type"]).to.include("application/json");
    // });

    // it("should respond with an array of todos for GET /", async () => {
    //   const response = await request.get("/");
    //   expect(response.body).to.be.an("array");
    // });

    // it("should respond with a 500 status code if there is an error", async () => {
    //   // Stub the getTodos method to throw an error
    //   const stub = sinon.stub(todoService, "getTodos");
    //   stub.throws(new Error("Test error"));

    //   const response = await request.get("/");
    //   expect(response.status).to.equal(500);

    //   // Restore the original method after the test
    //   stub.restore();
    // });

    // it("should respond with the correct todos for GET /", async () => {
    //   const response = await request.get("/");
    //   expect(response.body).to.be.an("array");
    //   // Need to remove the __v field added by mongoose
    //   const responseBodyWithoutV = response.body.map((doc) => {
    //     const { __v, ...docWithoutV } = doc;
    //     return docWithoutV;
    //   });

    //   expect(responseBodyWithoutV).to.deep.equal(testTodos);
    // });

    // it("should return a 200 status if the database has no todos", async () => {
    //   await Todo.deleteMany()
    //     .then(() => console.log(`Database cleared`))
    //     .catch((error) => {
    //       console.log(`Error clearing`);
    //       throw new Error();
    //     });
    //   const response = await request.get("/");
    //   expect(response.body).to.be.an("array");
    //   expect(response.body).to.have.length(0);
    // });
  });
  // describe("POST requests to /listings on ListingRoutes", () => {
  //   it("should respond with a 200 status code for a POST request to /listings if listing is added", async () => {
  //     let user = {
  //       email: "johndoe@gmail.com",
  //       password: "password101",
  //     };
  //     let response = await request.post("/login").send(user);
  //     expect(response.status).to.equal(200);
  //     user = response.body.user;
  //     const listing = {
  //       title: "Test Item",
  //       condition: "New",
  //       price: 32,
  //       description: "this is a test item",
  //       mainImage: "src/sadji",
  //     };
  //     response = await request
  //       .post(`/listings/add/${user.id}`, listing)
  //       .set({ "auth-token": user.token, Accept: "application/json" });
  //     expect(response.status).to.equal(201);
  //   });
  //   it("should respond with a 200 status code for a GET request to /listings/query if listings are found", async () => {
  //     const response = await request.get("/listings/search/test");
  //     expect(response.status).to.equal(200);
  //   });
  //   it("should respond with a 400 status code for a GET request to /listings/query if listings are not found", async () => {
  //     const response = await request.get(
  //       "/listings/search/wherearethelistings"
  //     );
  //     expect(response.status).to.equal(400);
  //   });
  //   it("should respond with a 200 status code for a GET request to /listings/:id if listings are  found", async () => {
  //     let user = {
  //       email: "johndoe@gmail.com",
  //       password: "password101",
  //     };
  //     let response = await request.post("/login").send(user);
  //     expect(response.status).to.equal(200);
  //     user = response.body.user;
  //     response = await request
  //       .get(`/listings/${user.id}`)
  //       .set({ "auth-token": user.token, Accept: "application/json" });
  //     expect(response.status).to.equal(200);
  //   });
  // });

  // describe("POST requests to / on UserRoutes", () => {
  //   // Test to demo function rather than arrow function can pass test too (as long as this is bound)
  //   it("should respond with a 200 status code for a POST request to /login if credentials are correct", async () => {
  //     const user = {
  //       email: "johndoe@gmail.com",
  //       password: "password101",
  //     };
  //     const response = await request.post("/login").send(user);
  //     expect(response.status).to.equal(200);
  //   });
  //   it("should respond with a 401 status code for a post request to /login if credentials are incorrect", async () => {
  //     const user = {
  //       email: "johndoe@gmail.com",
  //       password: "notpassword101",
  //     };
  //     const response = await request.post("/login").send(user);
  //     expect(response.status).to.equal(401);
  //   });
  //   it("should respond with a 500 status code for a post request to /login if invalid data is sent", async () => {
  //     let user = {
  //       email: "sadds",
  //       password: "word101",
  //     };
  //     let response = await request.post("/login").send(user);
  //     expect(response.status).to.equal(400);
  //   });

  //   it("should respond with a 201 status code for a POST request to /register with valid details", async () => {
  //     const user = {
  //       name: "Micheal Scott",
  //       email: "micheal@scott.com",
  //       phoneNumber: "07912345678",
  //       password: "password101",
  //     };
  //     const response = await request.post("/register").send(user);
  //     expect(response.status).to.equal(201);
  //   });
  //   it("should respond with a 400 status code for a POST request to /register with no details", async () => {
  //     const user = {};
  //     const response = await request.post("/register").send(user);
  //     expect(response.status).to.equal(400);
  //   });
  //   it("should respond with a 400 status code for a POST request to /register with invalid details", async () => {
  //     const user = {
  //       name: "Micheal Scott",
  //       email: "michealm",
  //       phoneNumber: "07912345678",
  //       password: "passwo",
  //     };
  //     const response = await request.post("/register").send(user);
  //     expect(response.status).to.equal(400);
  //   });

  // it("should respond with JSON for GET /", async () => {
  //   const response = await request.get("/");
  //   expect(response.headers["content-type"]).to.include("application/json");
  // });

  // it("should respond with an array of todos for GET /", async () => {
  //   const response = await request.get("/");
  //   expect(response.body).to.be.an("array");
  // });

  // it("should respond with a 500 status code if there is an error", async () => {
  //   // Stub the getTodos method to throw an error
  //   const stub = sinon.stub(todoService, "getTodos");
  //   stub.throws(new Error("Test error"));

  //   const response = await request.get("/");
  //   expect(response.status).to.equal(500);

  //   // Restore the original method after the test
  //   stub.restore();
  // });

  // it("should respond with the correct todos for GET /", async () => {
  //   const response = await request.get("/");
  //   expect(response.body).to.be.an("array");
  //   // Need to remove the __v field added by mongoose
  //   const responseBodyWithoutV = response.body.map((doc) => {
  //     const { __v, ...docWithoutV } = doc;
  //     return docWithoutV;
  //   });

  //   expect(responseBodyWithoutV).to.deep.equal(testTodos);
  // });

  // it("should return a 200 status if the database has no todos", async () => {
  //   await Todo.deleteMany()
  //     .then(() => console.log(`Database cleared`))
  //     .catch((error) => {
  //       console.log(`Error clearing`);
  //       throw new Error();
  //     });
  //   const response = await request.get("/");
  //   expect(response.body).to.be.an("array");
  //   expect(response.body).to.have.length(0);
  // });
  // });
  describe("PUT requests to / on UserRoutes", () => {
    it("should respond with a 200 status code for a PUT request to /user/:id if credentials are correct", async () => {
      const passwords = {
        currentPassword: "password101",
        newPassword: "NewPassword101",
      };
      let user = {
        email: "johndoe@gmail.com",
        password: "password101",
      };
      let response = await request.post("/login").send(user);
      user = response.body.user;
      expect(response.status).to.equal(200);
      response = await request
        .put(`/user/${user.id}`)
        .set({ "auth-token": user.token, Accept: "application/json" })
        .send(passwords);
      expect(response.status).to.equal(200);
    });
    it("should respond with a 400 status code for a PUT request to /user/:id if token is not valid", async () => {
      const passwords = {
        currentPassword: "password101",
        newPassword: "defonottheoldpassword3gh4",
      };
      let user = {
        email: "johndoe@gmail.com",
        password: "password101",
      };
      let response = await request.post("/login").send(user);
      user = response.body.user;
      expect(response.status).to.equal(200);
      response = await request
        .put(`/user/${user.id}`)
        .set({ "auth-token": "dsfiofj8reuwf", Accept: "application/json" })
        .send(passwords);
      expect(response.status).to.equal(401);
    });
  });
});
