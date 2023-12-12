import { v4 as uuid } from 'uuid';
import touhou_names from "../public/touhou-names.json" assert { type: "json" };

export let users = [];
export const USER_RATE_LIMIT = 5_000;

function generateUsername() {
  const name = touhou_names.names[Math.floor(Math.random() * touhou_names.names.length)]
  const id = Math.floor(Math.random() * 8_999 + 1_000);
  return `${name}#${id}`;
}

export function createUser(ws) {
  const user = {
    username: generateUsername(),
    id: uuid(),
    ws: ws,
    last_connected: Date.now(),
    last_message: 0,
    message_count: 0
  }

  users.push(user);
  return user;
}

export function deleteUser(userToDelete) {
  users = users.filter(user => user !== userToDelete);
}

export function getUserById(id){
  return users.find(user => user.id === id);
}

export function getUserByWs(ws) {
  return users.find(user => user.ws === ws);
}

export function getUserByUsername(username) {
  return users.find(user => user.username === username);
}