import { WebSocket } from "ws";

const opHandlers = [
  { op: 0, handle: onEvent },
  { op: 10, handle: setHeartBeat }
]

const eventHandlers = [
  { t: 'READY', handle: onReady },
  { t: 'MESSAGE_CREATE', handle: onMessage }
]

const TOKEN = "MTE4Mzg3NDMzNjc5NzQ5OTUxMg.GKQGLE.NqZqBY4tsE5VKz8g_qwb0z9PFH622onxWC9ajk";

const SOCKET_URL = "wss://gateway.discord.gg/";
const REST_URL = "https://discord.com/api/v10/";

let discordWs;
let heartBeatInterval;

export function startDiscordClient() {
  discordWs = new WebSocket(SOCKET_URL);
  discordWs.on('open', () => onOpen());
  
  discordWs.on('message', (data) => onSocketMessage(data));
  
  discordWs.on('close', () => onClose());
}

function onOpen() {
  console.log("Discord client connected to socket.");
  discordWs.send(JSON.stringify({
    op: 2,
    d: {
      token: TOKEN,
      properties: {
        "os": "linux",
        "browser": "estoult.fr",
        "device": "Google Cloud"
      },
      intents: 36864
    }
  }));
}

function onClose() {
  console.log('Discord client lost connection to socket.')
  clearInterval(heartBeatInterval);
}

function onSocketMessage(data) {
  const payload = JSON.parse(data);
  const opHandler = opHandlers.find(opHandler => opHandler.op === payload.op);
  if(opHandler === undefined) return;
  opHandler.handle(payload);
}

function setHeartBeat(payload) {
  const heartbeat_interval = payload.d.heartbeat_interval;

  heartBeatInterval = setInterval(function() {
    discordWs.send(JSON.stringify({
      op: 1,
      d: Date.now()
    }));
  }, heartbeat_interval);
}

function onEvent(payload) {
  const eventHandler = eventHandlers.find(eventHandler => eventHandler.t === payload.t);
  if(eventHandler === undefined) return;
  eventHandler.handle(payload.d);
}

function onMessage(message){
  if(message.channel_id !== '1183879717573632061') return;
  if(!message.author.bot) 
    sendMessage('1183879717573632061', message.content);
}

function onReady(d) {
  console.log(`${d.user.username} is connected to Discord!`);
}

function sendMessage(channelId, message) {
  fetch(`${REST_URL}/channels/${channelId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: message,
      tts: false
    })
  });
}