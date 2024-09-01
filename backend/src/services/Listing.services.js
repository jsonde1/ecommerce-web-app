// Desc: User services to handle user data
import bcrypt from "bcryptjs";
import sql from "mssql";

export default class ListingServices {
  saltRounds = 10;
  #db;
  constructor(db) {
    this.#db = db;
    // Configuration
    // Needs to be moved somewhere else
    cloudinary.config({
      cloud_name: "dfbay",
      api_key: "484727296952679",
      api_secret: "0x9DqnsA4cGyfwx7JnKqO2IW7L8",
    });
  }

  //Uploads image(base64) to cloudinary and returns the secure url
  async #uploadImage(image) {
    const uploadResult = await cloudinary.uploader
      .upload(image)
      .catch((error) => {
        throw error;
      });
    return uploadResult.secure_url;
  }
  async #removeImage(url) {
    const publicId = extractPublicId(url);
    return await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
  }

  async #findUserByID(id) {
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    const result = await request
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Users WHERE id = @id`);
    return result.recordset[0];
  }
  async #findListingByID(id, provisional = false) {
    let table;
    if (provisional) table = `ProvisionalListings`;
    else table = `Listings`;
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    const result = await request
      .input("id", sql.Int, id)
      .query(`SELECT * FROM ${table} WHERE id = @id`);
    return result.recordset[0];
  }

  async getListings(provisional = false, userID = 0) {
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    //If userID is 0, return all listings
    //If userID is not 0, return all listings except the ones by the seller
    // Not yet implemented
    let sqlQuery = `SELECT Listings.id, Listings.Title, Listings.Condition, Listings.Description, Listings.MainImage, Listings.CreationDate, Listings.UserID, Users.Name, Users.PhoneNumber FROM Listings LEFT JOIN Users ON Users.id = Listings.UserID WHERE NOT Listings.UserID = @UserID;`;
    if (provisional) sqlQuery = `SELECT * FROM ProvisionalListings;`;
    else request.input("UserID", sql.Int, userID);
    const result = await request.query(sqlQuery);
    return result.recordset;
  }
  async getListingsbyQuery(query) {
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    // % is a wildcard character in SQL to find any string that contains the query
    request.input("Query", sql.NVarChar(255), "%" + query + "%");
    //Using UPPER to make the search case insensitive
    const result = await request.query(
      `SELECT Listings.id, Listings.Title, Listings.Condition, Listings.Description, Listings.Price, Listings.MainImage, Listings.CreationDate, Listings.UserID, Listings.Status, Users.Name, Users.PhoneNumber FROM Listings LEFT JOIN Users ON Users.id = Listings.UserID WHERE UPPER(Listings.Title) LIKE UPPER(@Query)`
    );
    return result.recordset;
  }

  async getSellerListings(userID) {
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    request.input("UserID", sql.Int, userID);
    const result = await request.query(
      `SELECT id, Title, Condition, Description, Price, MainImage, Status FROM Listings WHERE UserID = @UserID;`
    );
    return result.recordset;
  }

  async addProvisionalListing(
    userID,
    { title, condition, description, price, image }
  ) {
    try {
      image = await this.#uploadImage(image);
      await this.#db.connect();
      const request = this.#db.poolconnection.request();
      request.input("Title", sql.NVarChar(255), title);
      request.input("Condition", sql.NVarChar(255), condition);
      request.input("Description", sql.NVarChar(255), description);
      request.input("Price", sql.Money, price);
      request.input("UserID", sql.Int, userID);
      request.input("MainImage", sql.NVarChar(255), image);
      const result = await request.query(
        `INSERT INTO ProvisionalListings (Title, Condition, Description, Price, UserID, MainImage) VALUES (@Title, @Condition, @Description, @Price, @UserID, @MainImage)`
      );
      return result.rowsAffected[0];
    } catch (error) {
      throw error;
    }
  }
  async addListing(id) {
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    console.log(id);
    request.input("ID", sql.Int, id);
    const result = await request.query(
      `BEGIN TRANSACTION;
INSERT INTO Listings (Title, Condition, Description, Price, UserID, MainImage, CreationDate)
SELECT Title, Condition, Description, Price, UserID, MainImage, CreationDate
FROM ProvisionalListings
WHERE id = @ID;
DELETE FROM ProvisionalListings
WHERE id = @ID;
COMMIT;`
    );
    console.log(result);
    return result.rowsAffected[0];
  }

  async editListing({ id, Title, Condition, Description, Price, MainImage }) {
    await this.#db.connect();
    let sqlQuery = `UPDATE Listings SET Title = @Title, Condition = @Condition, Description = @Description, Price = @Price WHERE id = @ID ;`;
    const request = this.#db.poolconnection.request();
    if (MainImage) {
      const originalListing = await this.#findListingByID(id);
      await this.#removeImage(originalListing.MainImage);
      const imageURL = await this.#uploadImage(MainImage);
      sqlQuery = `UPDATE Listings SET Title = @Title, Condition = @Condition, Description = @Description, Price = @Price, MainImage = @MainImage WHERE id = @ID ;`;
      request.input("MainImage", sql.NVarChar(255), imageURL);
    }
    request.input("ID", sql.Int, id);
    request.input("Title", sql.NVarChar(255), Title);
    request.input("Condition", sql.NVarChar(255), Condition);
    request.input("Description", sql.NVarChar(255), Description);
    request.input("Price", sql.Money, Price);
    const result = await request.query(sqlQuery);
    return result.rowsAffected[0];
  }
  async deleteListing(id, provisional = false) {
    let listing;
    let table;
    console.log(provisional);
    if (provisional) {
      listing = await this.#findListingByID(id, true);
      table = `ProvisionalListings`;
    } else {
      listing = await this.#findListingByID(id);
      table = `Listings`;
    }
    console.log(listing);
    const removed = await this.#removeImage(listing.MainImage);
    if (removed.result === "ok") {
      await this.#db.connect();
      const request = this.#db.poolconnection.request();
      request.input("ID", sql.Int, id);
      const result = await request.query(
        `DELETE FROM ${table} WHERE id = @ID;`
      );
      console.log(`deleted item id ${id} from the database`);
      return result.rowsAffected[0];
    } else throw new Error("Image not deleted");
  }
}

import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";
