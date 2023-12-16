import { wsClients } from "../ws-event-helper.js";

const HEARTBEAT_RATE = 5_000;

export function onHeatBeat(ws, d) {
  const wsClient = wsClients.find(wsClient => wsClient.ws === ws);
  if(Date.now() - wsClient.last_heartbeat < HEARTBEAT_RATE)
    return;

  wsClient.last_heartbeat = Date.now();
  ws.send(JSON.stringify({ op: 4 }));
} 