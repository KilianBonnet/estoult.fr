import Fastify from 'fastify'
import crypto from 'crypto';
import { onPushOnMain } from './on_push_on_main.js';

const WEBHOOK_SECRET = 'EV@MC5nKAjzN8cL29!=gw';
const fastify = Fastify({ logger: false })


fastify.post('/webhook', async (request, reply) => {
    const payload = request.body;

    if(request.body === undefined) {
        reply.code(403).send({ error: 'Unauthorized' });
        return;
    }

    if (!validateJsonWebhook(request)) {
        console.log("Signature invalide. Requête non autorisée.");
        reply.code(403).send({ error: 'Unauthorized' });
        return;
    }

    if(payload.ref !== 'refs/heads/main')
        return;
    
    onPushOnMain(reply);
});

function validateJsonWebhook(request) {
    // calculate the signature
    const expectedSignature = "sha1=" +
        crypto.createHmac("sha1", WEBHOOK_SECRET)
            .update(JSON.stringify(request.body))
            .digest("hex");

    // compare the signature against the one in the request
    const signature = request.headers["x-hub-signature"];
    return (signature === expectedSignature);
}


// Run the server!
fastify.listen({ port: 8000, host:'0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log("github-webhook server is listening");
})
