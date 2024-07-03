import { User } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../Repository/UserRepository";

const userRepository = new UserRepository()

export async function auth(request: FastifyRequest, reply: FastifyReply) {
    const {email, password} = request.body as User

    try{
        if(!email)throw new Error("Email can't be empty!");
        if(!password)throw new Error("Password can't be empty!")

        const user = await userRepository.find({email})

        if(!user)throw new Error("This user doen't exist!")

    }catch (error){
        console.log(error)

        reply.send(error)
    }
}