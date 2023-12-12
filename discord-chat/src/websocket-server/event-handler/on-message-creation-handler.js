import { users } from "../../logic/users.js";

export function sendMessageCreationEvent(message) {
  users.forEach(user => {
    if(user.ws !== undefined) 
      user.ws.send(JSON.stringify(
        {
          op: 11,
          d: message
        }
      ))
  }); 
} 