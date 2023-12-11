import { createUser, getUserByIpAddress, getUserByWs } from "../helpers/users.js";
import { onMessage } from "./event-handler/on-message-handler.js";

const opEvents = [
  { op: 10, handler: onMessage }
]

export function onConnection(ws, req) {
  const clientIpAddress = req.connection.remoteAddress;
  console.log(`[+] New connection from ${clientIpAddress}`);

  let user = getUserByIpAddress(clientIpAddress);
  if (user) {
    user.ws = ws,
      user.lastConnected = Date.now()
  }
  else
    user = createUser(ws, clientIpAddress);

  ws.send(JSON.stringify(
    {
      op: 1,
      d: {
        user: {
          username: user.username
        }
      }
    }
  ));
}

export function onSocketMessage(ws, data) {
  try {
    const dataString = data.toString('utf-8'); // Convert buffer in string
    const socketMessage = JSON.parse(dataString); // Parsing JSON
    const op = socketMessage.op;

    const user = getUserByWs(ws);
    if (user === undefined) {
      sendError(ws, "User not found.");
      return;
    }

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
    event.handler(user, socketMessage.d);
  }

  catch (e) {
    sendError(ws, e.toString());
  }
}

export function onClose(ws) {
  const user = getUserByWs(ws);
  user.ws = undefined;
  console.log(`[-] ${user.ipAddress} is disconnected.`);
}

export function sendError(ws, message) {
  const res = {
    "op": 0,
    "d": {
      "message": message
    }
  }
  ws.send(JSON.stringify(res));
}