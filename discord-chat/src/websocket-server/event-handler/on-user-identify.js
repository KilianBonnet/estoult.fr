import { createUser, getUserById } from "../../logic/users.js";

export function onUserIdentify(ws, d) {
  let user = getUserById(d);

  if(!user) user = createUser(ws);
  else {
    user.ws = ws,
    user.last_connected = Date.now()
  }

  console.log(`[+] New connection from ${user.username}`);
  ws.send(JSON.stringify({
    op: 3,
    d: {
      username: user.username,
      id: user.id
    }
  }))
}