import { deleteUser, getUserByWs } from "../logic/users.js";
import { onMessage } from "./event-handler/on-message-handler.js";
import { onUserIdentify } from "./event-handler/on-user-identify.js";

const opEvents = [
  // 0 - Errors
  // 1 - Hello
  { op: 2, handler: onUserIdentify },
  // 3 - User Info
  { op: 10, handler: onMessage }
  // 11 - Message Creation
]

export function onConnection(ws) {
  ws.send(JSON.stringify(
    {
      op: 1,
      d: "Hello, I'm Emu Otori. Emu is meaning SMIIIIIIIIIIIIILLE."
    }
  ));
}

export function onSocketMessage(ws, data) {
  try {
    const dataString = data.toString('utf-8'); // Convert buffer in string
    const socketMessage = JSON.parse(dataString); // Parsing JSON
    const op = socketMessage.op;

    // Check op format
    if (op === undefined || typeof (op) !== "number") {
      sendError(ws, "Invalid op format.");
      return;
    }

    // Search event from event list with the given op
    const event = opEvents.find(opEvent => opEvent.op === op);
    if (event === undefined) {
      sendError(ws, "Unknown op.");
      return;
    }

    // Calling event function
    event.handler(ws, socketMessage.d);
  }

  catch (e) {
    sendError(ws, e.toString());
  }
}

export function onClose(ws) {
  const user = getUserByWs(ws);
  if(user.message_count === 0) deleteUser(user);
  else user.ws = undefined;
  console.log(`[-] ${user.username} is disconnected.`);
}

export function sendError(ws, message) {
  const res = {
    "op": 0,
    "d": message
  }
  ws.send(JSON.stringify(res));
}