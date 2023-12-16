import { wsClients } from "../ws-event-helper.js";


export function sendMessageCreationEvent(message) {
  wsClients.forEach(wsClient => 
    wsClient.ws.send(JSON.stringify(
    {
      op: 10,
      d: message
    }
  )));
} 