import { wsClients } from "../ws-event-helper.js";


export function sendMessageCreationEvent(message) {
  wsClients.forEach(wsClient => 
    wsClient.send(JSON.stringify(
    {
      op: 12,
      d: message
    }
  )));
} 