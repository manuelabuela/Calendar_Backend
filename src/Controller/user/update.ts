import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IUpdateUser } from "../../@types/app";
import { returnUser } from "../../utils/returnUser";
import { UserRepository } from "../../Repository/UserRepository";
import { prismaClient } from "../../utils/prismaClient";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const {name, email, newPassword, password} = request.body as IUpdateUser

    const id = request.userId

    const userRepository = new UserRepository()

    try {
        if(request.headers.authentication)throw new Error("Token not found!")
        
        const user = await userRepository.find({id})

        const splited = request.headers.authorization?.split(" ")
        console.log(splited)

        if(!id) throw new Error("Error on authentication!")
        
        if(!user)throw new Error("Error on authentication!")

        if(newPassword||email){
            if(!password) throw new Error("Please, send the old password!");

            const match = await Bcrypt.compareSync(password, user.password)

            if(!match)throw new Error("Old password is incorrect!");
            
        }

        if(newPassword){
            const salt = Bcrypt.genSaltSync()
            const hash = Bcrypt.hashSync(newPassword, salt)
            await prismaClient.user.update({
                where: {id},
                data: {password:hash},
            })

            await userRepository = await userRepository.update({
                id,
                password: hash
            })
        }

        const updatedUser = await userRepository.update({
            id, 
            name,
            email,
        })

        return reply.send({
            message: "User updated successfully!",
            data: {user: returnUser(user)}
        })
        
    } catch (error) {
        reply.send(error)
    }
}