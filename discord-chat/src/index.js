import express from 'express';
import enableWs from 'express-ws';

import { onClose, onConnection, onSocketMessage } from './websocket-server/ws-event-helper.js';
import { messages } from './logic/messages.js';
import { onMessage } from './websocket-server/event-handler/on-message-handler.js';
import { onUserCreate } from './websocket-server/event-handler/on-user-identify.js';

const app = express();
enableWs(app);

app.use(express.json());

app.get('/api/chat/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/chat/messages', (req, res) => {
  onMessage(res, req.body);
});

app.post('/api/chat/users', (req, res) => {
  onUserCreate(req, res);
});

app.ws('/api/chat', (ws, req) => {
  const clientIp = req.connection.remoteAddress;
  onConnection(ws, clientIp);
  ws.on('message', (data) => onSocketMessage(ws, data));
  ws.on('close', () => onClose(ws, clientIp));
});

app.listen(80, '0.0.0.0');
