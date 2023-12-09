import { exec } from 'child_process';

export function onPushOnMain(reply) {
    console.log("Received a push on main");

    exec("pwd", (error, stdout, stderr) => {
        if (error) {
            execErrorHandler(reply, error);
            return;
        }

        reply.code(200).send(stdout);
    });
}



function execErrorHandler(reply, error) {
    console.error(error.toString());
    reply.code(500).send({ error: 'Internal Server Error' });
    return;
}