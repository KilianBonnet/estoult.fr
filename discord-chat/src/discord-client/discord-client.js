import { WebSocket } from "ws";
import { onDiscordMessage } from "../logic/messages.js";

const opHandlers = [
  { op: 0, handle: onEvent },
  { op: 10, handle: setHeartBeat }
]

const eventHandlers = [
  { t: 'READY', handle: onReady },
  { t: 'MESSAGE_CREATE', handle: onMessage }
]

const TOKEN = "MTE4Mzg3NDMzNjc5NzQ5OTUxMg.GKQGLE.NqZqBY4tsE5VKz8g_qwb0z9PFH622onxWC9ajk";
const DISCUSSION_CHANNEL = '1183879717573632061';
const RATE_LIMIT = 1_000;

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
  // Only listen to private discussion with Estoult
  if(message.channel_id !== DISCUSSION_CHANNEL) return;
  onDiscordMessage(message);
}

function onReady(d) {
  console.log(`${d.user.username} is connected to Discord!`);
}

export function sendDiscordMessage(message, rateLimitCallback) {
  fetch(`${REST_URL}/channels/${DISCUSSION_CHANNEL}/messages`, {
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
  setTimeout(() => rateLimitCallback(), RATE_LIMIT);
}

export const getDiscordMessages = () => 
  fetch(`${REST_URL}/channels/${DISCUSSION_CHANNEL}/messages`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
  .then((response) =>  response.ok ? response.json() : []);