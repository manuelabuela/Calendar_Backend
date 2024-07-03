import { prismaClient } from "../utils/prismaClient"
import { User } from "@prisma/client"

interface IUser{
    id?: string
    name?: string
    email?: string
    password?: string
    course?: string
    turma?: string
}

export class UserRepository{
    async find ({id, email}: IUser){
        const user = await prismaClient.user.findUnique({where: {id, email}})

        return user
    }

    async create ({name, email, password, course, turma}: User){
        const user = await prismaClient.user.create({
            data: {name, email, password, course, turma}
        })

        return user
    }

    async update ({id, name, email, password}: IUser){
        const user = await prismaClient.user.update({
            where: {id, email},
            data: {name, email, password}
        })

        return user
    }

    async remove({id, email}: IUser){
        const deletedUser = await prismaClient.user.delete({where: {id, email}})
    
        return deletedUser
    }

}