import Fastify from 'fastify'
import crypto from 'crypto';
import { onPushOnMain } from './on_push_on_main.js';

const webhookSecret = 'EV@MC5nKAjzN8cL29!=gw';
const fastify = Fastify({ logger: true })


fastify.post('/webhook', async (request, reply) => {
    const signature = "sha256=d72a1daa0f0e9022509fd422ef4487ac2671dce166cee0c87eac4910e803fdd0"//request.headers['x-hub-signature-256'];
    const payload = request.body;

    if (!verifySignature(signature, JSON.stringify(payload))) {
        console.log("Signature invalide. Requête non autorisée.");
        reply.code(403).send({ error: 'Unauthorized' });
        return;
    }

    if(payload.hook.config.secret !== webhookSecret) {
        reply.code(400).send("Invalid secret");
        return;
    }

    if(payload.ref !== 'refs/heads/main')
        return;
    
    onPushOnMain(reply);
});

function verifySignature(signature, payload) {
    const hmac = crypto.createHmac('sha256', webhookSecret);
    const calculatedSignature = `sha256=${hmac.update(payload).digest('hex')}`;
    return crypto.timingSafeEqual(
        Buffer.from(signature, 'utf-8'),
        Buffer.from(calculatedSignature, 'utf-8')
    );
}


// Run the server!
fastify.listen({ port: 8000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})