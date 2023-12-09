import Fastify from 'fastify'

const webhookSecret = 'EV@MC5nKAjzN8cL29!=gw';

const fastify = Fastify({ logger: true })


fastify.post('/webhook', async (request, reply) => {
    const payload = request.body;
    if(payload.hook.config.secret !== webhookSecret) {
        reply.code(400).send("Invalid secret");
        return;
    }
    reply.code(200);
});


// Run the server!
fastify.listen({ port: 8000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})