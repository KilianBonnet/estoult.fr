import { CHAT_API_URL, PROTOCOL_IS_TLS } from "../../constants";


const getMessages = () => 
  fetch(`${PROTOCOL_IS_TLS ? 'https' : 'http'}://${CHAT_API_URL}/messages`, {
    method: 'POST',
    
  })
  .then((response) => response.json());
document.addEventListener('DOMContentLoaded', getMessages);


const socket = new WebSocket(`ws://${CHAT_API_URL}`);

socket.addEventListener("open", function (event) {
  socket.send("Coucou le serveur !");
});

socket.addEventListener("message", function (event) {
  console.log("Voici un message du serveur", event.data);
});

socket.addEventListener("close", function (event) {
  console.log("Voici un message du serveur", event.data);
});

