// Desc: User services to handle user data
import bcrypt from "bcrypt";
import sql from "mssql";
export default class UserServices {
  saltRounds = 10;
  #db;
  constructor(db) {
    this.#db = db;
  }

  async #findUserByEmail(email) {
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    const result = await request
      .input("email", sql.NVarChar(255), email)
      .query(`SELECT * FROM Users WHERE Email = @email`);
    return result.recordset[0];
  }

  async #findUserByID(id) {
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    const result = await request
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Users WHERE id = @id`);
    return result.recordset[0];
  }

  async login({ email, password }) {
    const user = await this.#findUserByEmail(email);
    const match = await bcrypt.compare(password, user.Password);
    if (match) {
      //remove password hash and UserType for security
      delete user.Password;
      return user;
    }
    throw new Error("invalid login credentials");
  }

  async changePassword(id, { currentPassword, newPassword }) {
    const user = await this.#findUserByID(id);
    //check saved password hash against provided password
    const match = bcrypt.compare(currentPassword, user.Password);
    if (match) {
      console.log("passwords match");
      const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
      console.log(hashedPassword);
      await this.#db.connect();
      const request = this.#db.poolconnection.request();
      request.input("Password", sql.NVarChar(255), hashedPassword);
      request.input("id", sql.Int, id);
      const result = await request.query(
        `UPDATE Users SET Password = @Password WHERE id = @id`
      );
      return result.rowsAffected[0];
    }
    throw new Error("current password does not match");
  }
  //must change to use destructured req.body
  async register({ name, email, phoneNumber, password }) {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    await this.#db.connect();
    const request = this.#db.poolconnection.request();
    request.input("Name", sql.NVarChar(255), name);
    request.input("Email", sql.NVarChar(255), email);
    request.input("PhoneNumber", sql.NVarChar(255), phoneNumber);
    request.input("Password", sql.NVarChar(255), hashedPassword);
    const result = await request.query(
      `INSERT INTO Users (Name, Email, PhoneNumber, Password) VALUES (@Name, @Email, @PhoneNumber, @Password)`
    );
    return result.rowsAffected[0];
  }
}
