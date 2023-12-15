import { WebSocket } from "ws";
import { onDiscordMessage } from "../logic/messages.js";
import { setServerStatus } from "../logic/server-state.js";


export class DiscordMessageResponse {
  /**
   * @param {boolean} ok - Indicate if response is successful.
   * @param {number} status - HTTP response code.
   * @param {*} content - Content of the response.
   */
  constructor(ok, status, content) {
    this.ok = ok;
    this.status = status;
    this.content = content;
  }
}


const opHandlers = [
  { op: 0, handle: onEvent },
  { op: 10, handle: setHeartBeat }
]

const eventHandlers = [
  { t: 'READY', handle: onReady },
  { t: 'MESSAGE_CREATE', handle: onMessage }
]

const SOCKET_URL = "wss://gateway.discord.gg";
const REST_URL = "https://discord.com/api/v10";
const CDN_URL = "https://cdn.discordapp.com";
const TOKEN = "MTE4Mzg3NDMzNjc5NzQ5OTUxMg.GKQGLE.NqZqBY4tsE5VKz8g_qwb0z9PFH622onxWC9ajk";
const DISCUSSION_CHANNEL = '1183879717573632061';

const RATE_LIMIT = 10_000;
const RETRY_AFTER = 30_000;

let discordWs;
let heartBeatInterval;
startDiscordClient();

export function startDiscordClient() {
  discordWs = new WebSocket(SOCKET_URL);
  discordWs.on('open', () => onOpen());
  discordWs.on('message', (data) => onSocketMessage(data));
  discordWs.on('close', () => onClose());
  discordWs.on('error', () => {});
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
  setServerStatus('discord-client', false);
  setTimeout(() => startDiscordClient(), RETRY_AFTER);
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
  setServerStatus('discord-client', true);
}

export function sendDiscordMessage(message, rateLimitCallback) {
  const response = fetch(`${REST_URL}/channels/${DISCUSSION_CHANNEL}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: message,
      tts: false
    })
  })
  .then(response => response
    .json()
    .then(content => new DiscordMessageResponse(true, response.status, content)))
  .catch(error => new DiscordMessageResponse(false, 500, error.toString()));

  if(rateLimitCallback !== undefined)
    setTimeout(() => rateLimitCallback(), RATE_LIMIT);

  return response;
}

export function getEstoultProfilePicture() {
  return fetch(`${REST_URL}/user/234320879675375616`, {
    method: 'GET',
    headers: { Authorization: `Bot ${TOKEN}`}
  })
  .then(response => 
    response.json()
    .then(estoult => fetch(`${CDN_URL}/avatar/234320879675375616/${estoult.avatar}.png`)
    .then(response => {
      if(response.ok) return response.arrayBuffer();
      throw new Error("Cannot fetch CDN URL");
    }))
  )
}