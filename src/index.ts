import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger"
import { connectDB } from "./utils/database"
const app = new Elysia()
.use(swagger())
.listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
console.log("connecting to the database...")
try {
  await connectDB(50,10)
  console.log("Database Connected")
}
catch(e) {
  console.error(e)
}