import express from "express";
import { postgraphile } from "postgraphile";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const DATABASE_URL = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/database";
// Use PostGraphile with express
app.use(
  postgraphile(DATABASE_URL, "public", {
    graphiql: true, // Enables GraphiQL interface in the browser
    enhanceGraphiql: true,
  })
);

app.listen(3002, () => {
  console.log("PostGraphile server is running on http://localhost:3002");
});
