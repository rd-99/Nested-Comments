import fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import sensible from "@fastify/sensible";

const app = fastify({ logger: true });
app.register(sensible);
const prisma = new PrismaClient();

async function committodb(promise) {
  const [error, data] = await app.to(promise);
  if (error) {
    app.log.error(error);
    return app.httpErrors(error.message);
  }
  return data;
}

app.get("/posts", async (req, res) => {
  const posts = await committodb(prisma.post.findMany());
  return posts;
});
app.listen({ port: process.env.PORT });
