import { postgraphile } from "postgraphile";
import { NextRequest, NextResponse } from "next/server";

// Set up your PostgreSQL connection string (update the credentials)
const DATABASE_URL = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/mydb";

// This is the main PostGraphile handler for GraphQL requests
export async function GET(req: NextRequest, res: NextResponse) {
  return postgraphile(DATABASE_URL, "public", {
    watchPg: false,
    graphiql: true,  // Enables GraphiQL interface
  })(req, res);
}

export async function POST(req: NextRequest, res: NextResponse) {
  return postgraphile(DATABASE_URL, "public", {
    watchPg: false,
    graphiql: true,  // Enables GraphiQL interface
  })(req, res);
}
