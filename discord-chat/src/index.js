import express from 'express';
import enableWs from 'express-ws';

import { onClose, onConnection, onSocketMessage } from './websocket-server/ws-event-helper.js';
import { messages } from './logic/messages.js';

const app = express();
enableWs(app);

app.get('/api/chat/messages', (req, res) => {
  res.json(messages);
});

app.ws('/api/chat', (ws, req) => {
  onConnection(ws);
  ws.on('message', (data) => onSocketMessage(ws, data));
  ws.on('close', () => onClose(ws));
});

app.listen(80, '0.0.0.0');
