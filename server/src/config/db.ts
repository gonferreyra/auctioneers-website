import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../constants/env';

const database = DB_NAME;
const user = DB_USER;
const password = DB_PASSWORD;
const host = DB_HOST;

export const DB = new Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
  // show SQL commands on console - add logger to see the sql scripts
  // logging: console.log,
  logging: false,
});

// connection
async function dbConnection() {
  try {
    await DB.sync(); // sync models in development
    // await DB.authenticate();
    console.log('Successfully connected to DB');
  } catch (error) {
    throw new Error(`Error connecting to DB: ${(error as Error).message}`);
  }
}

export default dbConnection;
