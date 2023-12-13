import { getDiscordMessages, sendDiscordMessage } from "../discord-client/discord-client.js";
import { sendMessageCreationEvent } from "../websocket-server/event-handler/on-message-creation-handler.js";
import { getUserByUsername } from "./users.js";

export let messages = await retrieveMessages();

let canSend = true;
const MESSAGE_QUEUE = [];

function dequeueMessages() {
  const message = MESSAGE_QUEUE.shift();

  if(message === undefined) 
    canSend = true;

  else 
    message.resolveFunction(
      sendDiscordMessage(message.content, dequeueMessages)
        .then((response) => resolveDiscordMessageResponse(response))
    );
}


export const sendMessage = (username, content) => {
  const message = `### ${username}\n${content}`;

  if(canSend) {
    canSend = false;
    return sendDiscordMessage(message, dequeueMessages)
      .then((response) => resolveDiscordMessageResponse(response));
  }

  const queuePromise = new Promise((resolve, reject) => 
    MESSAGE_QUEUE.push({ resolveFunction: resolve, content: message}))

  return queuePromise;
}

const resolveDiscordMessageResponse = (discordResponse) =>
  discordResponse.ok ? 
    {
      status: 200,
      ok: true,
      content: convertToMessage(discordResponse.content),
    } : {
      status: discordResponse.content,
      ok: false,
      content: 'Message failed to reach Discord server.'
    }

export function onDiscordMessage(discordMessage) {
  const message = convertToMessage(discordMessage);
  if(message === undefined) return;

  messages = [message, ...messages];
  sendMessageCreationEvent(message);

  const user = getUserByUsername(message.username);
  if(user === undefined) return;
  user.message_count++;
}

async function retrieveMessages() {
  const messages = [];
  const discordMessages = await getDiscordMessages();

  discordMessages.forEach((discordMessage) => {
    const message = convertToMessage(discordMessage);
    if(message === undefined) return;
    messages.push(message);
  });

  return messages;
}

function convertToMessage(discordResponse) {
  // If the message author is Estoult
  if(!discordResponse.author.bot) {
    return {
      username: 'Estoult',
      content: discordResponse.content,
      timestamp: discordResponse.timestamp
    }
  }

  // If the message author is the bot
  const messageSplit = discordResponse.content.split('\n');
  const header = messageSplit[0];

  // Check bot message
  if(header.startsWith('### ')) {
    return {
      username: header.slice(4),
      content:  messageSplit[1],
      timestamp: discordResponse.timestamp
    }
  }
}