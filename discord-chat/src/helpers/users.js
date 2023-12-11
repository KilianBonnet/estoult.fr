import touhou_names from "../public/touhou-names.json" assert { type: "json" };

const users = [];

function generateUsername() {
  const name = touhou_names.names[Math.floor(Math.random() * touhou_names.names.length)]
  const id = Math.floor(Math.random() * 10_000);
  return `${name}#${id}`;
}

export function createUser(ws, ipAddress) {
  const user = {
    username: generateUsername(),
    ws: ws,
    ipAddress: ipAddress,
    lastConnected: Date.now()
  }

  users.push(user);
  return user;
}

export function getUserByIpAddress(ipAddress){
  return users.find(user => user.ipAddress === ipAddress);
}

export function getUserByWs(ws) {
  return users.find(user => user.ws === ws);
}