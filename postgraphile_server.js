import express from "express"
import { postgraphile } from "postgraphile"
import dotenv from 'dotenv'
dotenv.config()

// Just an example, for full testing use the server from https://github.com/derekjwilliams/event_graphql 
const app = express();
const DATABASE_URL = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/database";
app.use(
  postgraphile(DATABASE_URL, "public", {
    graphiql: true,
    enhanceGraphiql: true,
  })
)

app.listen(3002, () => {
  console.log("PostGraphile server is running on http://localhost:3002");
})
