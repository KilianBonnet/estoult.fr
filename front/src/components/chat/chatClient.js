import { CHAT_API_URL, PROTOCOL_IS_TLS } from "../../constants";

let chatSocket;

export function getMessage() {
  fetch(`${PROTOCOL_IS_TLS ? 'https' : 'http'}://${CHAT_API_URL}/messages`)
  .then((response) => response.json())
  .then(messages => console.log(messages))
  .catch((error) => console.log(error.toString()))
}

export function getUser() {
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    return fetchUser(token);
  }
  catch {
    return fetchUser();
  }
}

function fetchUser(token) {
  return fetch(`${PROTOCOL_IS_TLS ? 'https' : 'http'}://${CHAT_API_URL}/users`, {
    method: 'POST',
    headers: {
      authorization: token
    }
  })
  .then((response) => response.json())
}

export function startChatSocket() {
  chatSocket = new WebSocket(`ws://${CHAT_API_URL}`);

  socket.addEventListener("open", function (event) {
    
  });
  
  socket.addEventListener("message", function (event) {
    console.log("Voici un message du serveur", event.data);
  });
  
  socket.addEventListener("close", function (event) {
    console.log("Voici un message du serveur", event.data);
  });
}

export function stopChatSocket() {
  if(chatSocket !== undefined)
    chatSocket.close();
}