import sql from "mssql";

export default class Database {
  config = {};
  poolconnection = null;
  connected = false;

  constructor(config) {
    this.config = config;
    console.log(`Database: config: ${JSON.stringify(config)}`);
  }

  async connect() {
    try {
      console.log(
        `Connecting to Database: ${this.config.database} (${this.config.server})...`
      );
      if (this.connected === false) {
        this.poolconnection = await sql.connect(this.config);
        this.connected = true;
        console.log("Database connection successful");
      } else {
        console.log("Database already connected");
      }
    } catch (error) {
      console.error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
  }

  async disconnect() {
    try {
      this.poolconnection.close();
      console.log("Database connection closed");
    } catch (error) {
      console.error(`Error closing database connection: ${error}`);
    }
  }

  async executeQuery(query, paramsName, params) {
    await this.connect();
    const request = this.poolconnection.request();
    if (params) {
      for (let i = 0; i < params.length; i++) {
        request.input(paramsName[i], sql.NVarChar(255), params[i]);
      }
    }
    const result = await request.query(query);

    return result.rowsAffected[0];
  }
}
