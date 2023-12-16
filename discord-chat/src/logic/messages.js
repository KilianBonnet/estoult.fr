import { DiscordMessageResponse, sendDiscordMessage } from "../discord-client/discord-client.js";
import { sendMessageClearEvent } from "../websocket-server/event-handler/on-message-clear-command.js";
import { sendMessageCreationEvent } from "../websocket-server/event-handler/on-message-creation-handler.js";
import { getUserByUsername } from "./users.js";

const estoultCommandBinding = [
  {'command': '!clear', 'action': clearMessages }
]


export class QueuedMessage {
  constructor(resolveFunction, message) {
    this.resolveFunction = resolveFunction;
    this.message = message;
  }
}

export class Message {
  /**
   * @param {string} author 
   * @param {string} content 
   * @param {string} timestamp 
   */
  constructor(author, content, timestamp) {
    this.author = author;
    this.content = content;
    this.timestamp = timestamp;
  }
}

export class MessageResponse {
  /**
   * @param {boolean} ok - Indicate if response is successful.
   * @param {number} status - HTTP response code.
   * @param {Message | string} content - Content of the response.
   */
  constructor(ok, status, content) {
    this.ok = ok;
    this.status = status;
    this.content = content;
  }
}

export let messages = [];
let canSend = true;

/** @type {Array<QueuedMessage>} */
const MESSAGE_QUEUE = [];
const MAX_MESSAGES = 50;

function dequeueMessages() {
  const queueMessage = MESSAGE_QUEUE.shift();

  if(queueMessage === undefined) 
    canSend = true;

  else 
    queueMessage.resolveFunction(sendDiscordMessage(queueMessage.message, dequeueMessages)
      .then(discordMessageResponse => createMessageResponse(discordMessageResponse)));
}

/**
 * @param {string} username 
 * @param {string} content 
 */
export const sendMessage = (username, content) => {
  const message = `### ${username}\n${content}`;

  if(canSend) {
    canSend = false;
    return sendDiscordMessage(message, dequeueMessages)
      .then(discordMessageResponse => createMessageResponse(discordMessageResponse));
  }

  /** @type {Promise<MessageResponse>} */
  const queuePromise = new Promise((resolve, reject) => 
    MESSAGE_QUEUE.push(new QueuedMessage(resolve, message)));

  return queuePromise;
}

/**
 * @param {DiscordMessageResponse} discordMessageResponse 
 */
const createMessageResponse = (discordMessageResponse) => 
  discordMessageResponse.ok ? 
    new MessageResponse(true, 201, convertToMessage(discordMessageResponse.content)) :
    new MessageResponse(false, 500, 'Internal server error.');

export function onDiscordMessage(discordMessage) {
  const message = convertToMessage(discordMessage);
  if(message === undefined) return;

  messages.unshift(message);
  if (messages.length > MAX_MESSAGES)
    messages.splice(MAX_MESSAGES);

  sendMessageCreationEvent(message);

  const user = getUserByUsername(message.username);
  if(user === undefined) return;
  user.message_count++;
}

function convertToMessage(discordMessage) {
  const messageContent = discordMessage.content;

  if(!discordMessage.author.bot) {
    const command = estoultCommandBinding.find(commandBind => commandBind.command === messageContent);

    if(command === undefined)
      return new Message('Estoult', messageContent, discordMessage.timestamp);
    
    command.action();
  }

  // If the message author is the bot
  const messageSplit = messageContent.split('\n');
  const header = messageSplit[0];

  // Check bot message
  if(header.startsWith('### '))
    return new Message(header.slice(4), messageSplit[1], discordMessage.timestamp);
}

export function clearMessages() {
  messages = [];
  sendMessageClearEvent();
  sendDiscordMessage('Clear done.');
}