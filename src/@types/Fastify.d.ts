import "fastify"
// import { FastifyRequest } from "fastify"

declare module "fastify"{
    interface FastifyRequest{
        userId: string
    }
}