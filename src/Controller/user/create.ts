import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { User } from "@prisma/client";
import { UserRepository } from "../../Repository/UserRepository";
import { returnUser } from "../../utils/returnUser";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password, turma, course } = request.body as User;

  const userRepository = new UserRepository();

  try {
    console.log({ name, email, password, turma, course });

    if (!email) {
      throw new Error("Email con't be empty!");
    }
    if (!password) {
      throw new Error("Password can't be empty!");
    }
    if (!course) {
      throw new Error("Course can't be empty!");
    }
    if (!turma) {
      throw new Error("Turma can't be empty!");
    }

    const creatUser = {
      name,
      email,
      password,
      turma,
      course,
    } as User;

    const user = await userRepository.create(creatUser);
  
    reply.send({
        message: "User creayed successfully!",
        user: returnUser(user)
    })
} catch (error) {
    return reply.send(error);
  }
}
