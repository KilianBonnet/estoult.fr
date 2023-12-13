import { wsClients } from "../ws-event-helper.js";

export function sendServerReadyEvent(ws, isServerReady) {
  ws.send(JSON.stringify({
    op: 2,
    d: isServerReady
  }));
}

export function broadcastIsReadyEvent(isReady) {
  wsClients.forEach(wsClient => sendServerReadyEvent(wsClient, isReady));
}