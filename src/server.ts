import Fastify from "fastify";

const fastify = Fastify();

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log("Server is now listening on 3000");
});
