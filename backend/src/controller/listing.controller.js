import ListingServices from "../services/Listing.services.js";
export default class ListingController {
  #services;
  constructor(service = new ListingServices()) {
    this.#services = service;
  }
  addProvisionalListing = async (req, res) => {
    try {
      const rowsAffected = await this.#services.addListing(
        req.params.id,
        req.body,
        true
      );
      if (rowsAffected === 0) throw new Error("Listing not created");
      res.status(201).send({
        message: `Listing has been successfully created and will be published subject to approval`,
        rowsAffected,
      });
    } catch (error) {
      if (error.message === "Listing not created") {
        return res.status(400).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: error.message,
      });
    }
  };
  addListing = async (req, res) => {
    try {
      const rowsAffected = await this.#services.addListing(
        req.params.id,
        req.body
      );
      if (rowsAffected === 0) throw new Error("Listing not created");
      res.status(201).send({
        message: `Listing has been successfully created`,
        rowsAffected,
      });
    } catch (error) {
      if (error.message === "Listing not created") {
        return res.status(400).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: error.message,
      });
    }
  };
  editListing = async (req, res) => {
    try {
      const rowsAffected = await this.#services.editListing(req.body);
      if (rowsAffected === 0) throw new Error("Listing not modified");
      res.status(200).send({
        message: `Listing has been successfully modified`,
        rowsAffected,
      });
    } catch (error) {
      if (error.message === "Listing not modified") {
        return res.status(400).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: error.message,
      });
    }
  };
  deleteListing = async (req, res) => {
    try {
      const rowsAffected = await this.#services.deleteListing(req.params.id);
      if (rowsAffected === 0) throw new Error("Listing not deleted");
      res.status(200).send({
        message: `Listing has been successfully deleted`,
        rowsAffected,
      });
    } catch (error) {
      if (error.message === "Listing not deleted") {
        return res.status(400).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: error.message,
      });
    }
  };

  getListings = async (req, res) => {
    try {
      const listings = await this.#services.getListings();
      if (listings.length === 0) throw new Error("No Listings found");
      res.status(200).send(listings);
    } catch (error) {
      if (error.message === "No Listings found") {
        return res.status(400).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: error.message,
      });
    }
  };
  getProvisionalListings = async (req, res) => {
    try {
      const listings = await this.#services.getListings(true); // true for provisional listings
      if (listings.length === 0) throw new Error("No Listings found");
      res.status(200).send(listings);
    } catch (error) {
      if (error.message === "No Listings found") {
        return res.status(400).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: error.message,
      });
    }
  };
  getListingsbyQuery = async (req, res) => {
    try {
      const listings = await this.#services.getListingsbyQuery(
        req.params.query
      );
      if (listings.length === 0) throw new Error("No Listings found");
      res.status(200).send(listings);
    } catch (error) {
      if (error.message === "No Listings found") {
        return res.status(400).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: error.message,
      });
    }
  };
  getSellerListings = async (req, res) => {
    try {
      const listings = await this.#services.getSellerListings(req.params.id);
      if (listings.length === 0) throw new Error("No Listings found");
      res.status(200).send(listings);
    } catch (error) {
      if (error.message === "No Listings found") {
        return res.status(400).send({
          message: error.message,
        });
      }
      res.status(500).send({
        message: error.message,
      });
    }
  };
}
