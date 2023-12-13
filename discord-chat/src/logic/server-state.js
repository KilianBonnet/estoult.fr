import { broadcastIsReadyEvent } from "../websocket-server/event-handler/on-server-ready-event.js";

const SERVER_STATUS = [
  { name: 'discord-client', isReady: false },
]

export function setServerStatus(name, isReady) {
  const status =  SERVER_STATUS.find(status => status.name === name);
  if(status === undefined || status.isReady === isReady) return;
  status.isReady = isReady;
  
  if(isServerReady()) {
    console.log("Server is ready!");
    broadcastIsReadyEvent(true);
  }
  else {
    console.log(`Server is not ready!`, SERVER_STATUS);
    broadcastIsReadyEvent(false);
  }
}

export function isServerReady() {
  return SERVER_STATUS.find(status => status.isReady === false) === undefined;
}