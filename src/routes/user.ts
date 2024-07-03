import { FastifyInstance } from "fastify";
import * as controller from "../Controller/user"

export async function userRoutes(fastify:FastifyInstance) {
    fastify.post("/", controller.create)
    fastify.post("/auth", controller.auth)
    fastify.delete("/", controller.remove)
    fastify.put("/", controller.update)
}