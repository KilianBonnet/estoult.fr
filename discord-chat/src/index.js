import { WebSocketServer } from 'ws';
import { onClose, onConnection, onSocketMessage } from './websocket-server/ws-event-helper.js';
import { startDiscordClient } from './discord-client/discord-client.js';

const wss = new WebSocketServer({ port: 80, host: '0.0.0.0' });

wss.on('listening', () => console.log('Server listening on port 8080'));

wss.on('connection', (ws, req) => {
    onConnection(ws, req);
    ws.on('message', (data) => onSocketMessage(ws, data));
    ws.on('close', () => onClose(ws));
});

startDiscordClient();