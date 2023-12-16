import { isServerReady } from "../logic/server-state.js";
import { onHeatBeat } from "./event-handler/on-heart-beat.js";
import { sendServerReadyEvent } from "./event-handler/on-server-ready-event.js";

export let wsClients = [];

const opEvents = [
  // 0 - Errors
  // 1 - Hello
  // 2 - Server Status
  { op: 3, handler: onHeatBeat }
  // 4 - Heartbeat ack
  // 10 - Message Creation
  // 12 - Message clear event
]

export function onConnection(ws, clientIp) {
  wsClients.push({ ws, last_heartbeat: 0 });

  ws.send(JSON.stringify(
    {
      op: 1,
      d: "Hello, I'm Emu Otori. Emu is meaning SMIIIIIIIIIIIIILLE."
    }
  ));
  sendServerReadyEvent(ws, isServerReady());
}

export function onSocketMessage(ws, data) {
  try {
    const dataString = data.toString('utf-8'); // Convert buffer in string
    const socketMessage = JSON.parse(dataString); // Parsing JSON
    const op = socketMessage.op;
    console.log(socketMessage);
    // Check op format
    if (op === undefined || typeof (op) !== "number") {
      sendSocketError(ws, "Invalid op format.");
      return;
    }

    // Search event from event list with the given op
    const event = opEvents.find(opEvent => opEvent.op === op);
    if (event === undefined) {
      sendSocketError(ws, "Unknown op.");
      return;
    }

    // Calling event function
    event.handler(ws, socketMessage.d);
  }

  catch (e) {
    sendSocketError(ws, e.toString());
  }
}

export function onClose(ws, clientIp) {
  console.log(`[-] ${clientIp} is disconnected from socket.`);
  wsClients = wsClients.filter(wsClient => wsClient.ws !== ws);
}

export function sendSocketError(ws, message) {
  const res = {
    "op": 0,
    "d": message
  }
  ws.send(JSON.stringify(res));
}