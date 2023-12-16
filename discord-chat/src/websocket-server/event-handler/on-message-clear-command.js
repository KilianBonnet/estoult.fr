import { wsClients } from "../ws-event-helper.js";

export function sendMessageClearEvent() {
  wsClients.forEach(wsClient => wsClient.ws.send(JSON.stringify({ op: 12 })));
} 