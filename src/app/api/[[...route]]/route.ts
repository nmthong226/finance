import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from "hono"
import { handle } from "hono/vercel";
import summary from "./summary";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
export const runtime = "edge";

const app = new Hono().basePath("/api")

app.get("/hello", clerkMiddleware(), (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({error: "Unauthorized"})
    }
  return c.json({
    message: "Hello Next.js!",
    userId: auth.userId,
  })
})

const routes = app
  .route("/summary", summary)
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;