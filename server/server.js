import fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";

const app = fastify({ logger: true });
app.register(sensible);
app.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
});
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
  const posts = await committodb(
    prisma.post.findMany({
      select: {
        id: true,
        title: true,
      },
    })
  );
  return posts;
});

app.get("/posts/:id", async (req, res) => {
  const posts = await committodb(
    prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        title: true,
        body: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            message: true,
            parentId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
  );
  return posts;
});

app.listen({ port: process.env.PORT });
