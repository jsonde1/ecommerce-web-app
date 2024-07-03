import { expect } from "chai";
import sinon from "sinon";

import ListingController from "../../../src/controller/listing.controller.js";

describe("ListingController", () => {
  let listingController;
  let listingServices;
  let req;
  let res;

  beforeEach(() => {
    listingServices = {
      getListings: sinon.stub(),
      addListing: sinon.stub(),
    };
    listingController = new ListingController(listingServices);
    req = {
      body: {},
      // params: { id: "13" },
    };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.spy(),
    };
  });

  describe("getListings tests", () => {
    const listings = [
      {
        id: 1,
        Title: "Playstation 3",
        Condition: "New",
        Price: 349,
        Description: "Brand new playstation 3 home entertainment system",
        UserID: 13,
        MainImage: "src/smd",
        CreationDate: "2024-06-26T21:26:03.000Z",
      },
      {
        id: 2,
        Title: "TV Stand",
        Condition: "Used",
        Price: 50,
        Description: "used tv stand for 50 inch tv",
        UserID: 13,
        MainImage: "src/sbjd",
        CreationDate: "2024-06-26T23:03:36.000Z",
      },
    ];
    it("should get all listings from the service and return them ", async () => {
      // Arrange

      listingServices.getListings.resolves(listings);
      // Act
      await listingController.getListings(req, res);
      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(listings)).to.be.true;
    });

    it("should send a 400 response if no listings can be found", async () => {
      const testError = new Error("User not found");
      // Arrange

      listingServices.getListings.resolves([]);
      // Act
      await listingController.getListings(req, res);
      // Assert
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith({ message: "No Listings found" })).to.be.true;
    });

    it("should send 500 response if there is a system error", async () => {
      const testError = new Error("System error");
      listingServices.getListings.rejects(testError);

      await listingController.getListings(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: "System error" })).to.be.true;
    });
  });

  describe("addListing tests", () => {
    xit("should return rows affected and 201 status when listing created ", async () => {
      // Arrange
      const rowsAffected = 1;
      listingServices.addListing.resolves(rowsAffected);

      // Act
      await listingController.addListing(req, res);

      // Assert
      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.send.calledWith({
          message: `Listing has been successfully created`,
          rowsAffected,
        })
      ).to.be.true;
    });

    xit("should send a 400 response if listing cannot be created", async () => {
      const rowsAffected = 0;
      listingServices.addListing.resolves(rowsAffected);
      await listingController.addListing(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith({ message: "Listing not created" })).to.be
        .true;
    });

    xit("should send 500 response if there is a system error", async () => {
      const testError = new Error("System error");
      listingServices.addListing.rejects(testError);

      await listingController.addListing(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: "System error" })).to.be.true;
    });
  });
});
