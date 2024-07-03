import { Notes } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { FastifyReply, FastifyRequest } from "fastify";

export async function create(request:FastifyRequest, reply: FastifyReply) {
    const {name} = request.body as Notes

    const userId = request.userId
    const prismaClient = new PrismaClient()
    
}