import { getDiscordMessages, sendDiscordMessage, startDiscordClient } from "../discord-client/discord-client.js";
import { sendMessageCreationEvent } from "../websocket-server/event-handler/on-message-creation-handler.js";
import { getUserByUsername } from "./users.js";

export let messages = await retrieveMessages();

let canSend = true;
const MESSAGE_QUEUE = [];

startDiscordClient();

function dequeueMessages() {
  const message = MESSAGE_QUEUE.shift();
  if(message === undefined) canSend = true;
  else sendDiscordMessage(message, dequeueMessages);
}


export function sendMessage(username, content) {
  const message = `### ${username}\n${content}`;

  if(canSend) {
    canSend = false;
    sendDiscordMessage(message, dequeueMessages);
  }
  else MESSAGE_QUEUE.push(message);
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

function convertToMessage(discordMessage) {
  // If the message author is Estoult
  if(!discordMessage.author.bot) {
    return {
      username: 'Estoult',
      content: discordMessage.content,
      timestamp: discordMessage.timestamp
    }
  }

  // If the message author is the bot
  const messageSplit = discordMessage.content.split('\n');
  const header = messageSplit[0];

  // Check bot message
  if(header.startsWith('### ')) {
    return {
      username: header.slice(4),
      content:  messageSplit[1],
      timestamp: discordMessage.timestamp
    }
  }
}