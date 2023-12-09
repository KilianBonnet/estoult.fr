import { exec } from 'child_process';

export function onPushOnMain(reply) {
    console.log("Received a push on main");

    exec("cd .. && docker compose down && docker compose up -d", (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
    });
}