import { exec } from 'child_process';

export function onPushOnMain(reply) {
    exec(
    `
    echo "Received a push on main\n" > nohup.out
    cd ..
    docker compose down
    ./build-nginx.sh
    docker compose up -d
    `,
    (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error) console.error('Error:', error);
    });
}