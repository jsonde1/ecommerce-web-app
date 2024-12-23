import * as dotenv from "dotenv";
if (process.platform === "win32")
  dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });

const server = process.env.AZURE_SQL_SERVER;
const database = process.env.AZURE_SQL_DATABASE;
const port = parseInt(process.env.AZURE_SQL_PORT);
const user = process.env.AZURE_SQL_USER;
const password = process.env.AZURE_SQL_PASSWORD;
const serverPORT = process.env.PORT;
export const config = {
  server,
  port,
  database,
  user,
  password,
  serverPORT,
  options: {
    encrypt: true,
  },
};
