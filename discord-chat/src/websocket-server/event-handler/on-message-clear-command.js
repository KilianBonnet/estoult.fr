import { wsClients } from "../ws-event-helper.js";

export function sendMessageClearEvent() {
  wsClients.forEach(wsClient => wsClient.send(JSON.stringify({ op: 12 })));
} 