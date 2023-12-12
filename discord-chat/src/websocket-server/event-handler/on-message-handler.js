import { sendMessage } from "../../logic/messages.js";
import { USER_RATE_LIMIT, getUserById } from "../../logic/users.js";
import { sendError } from "../ws-event-helper.js";

const VALID_REGEX = /^[a-zA-Z0-9àáâäèéêëìíîïòóôöùúûüç.'"()=+&\[\],!?; ]+$/;

export function onMessage(ws, d) {
  if(d === undefined) {
    sendError(ws, 'Missing payload.');
    return;
  }

  const id = d.id;
  if(id === undefined || typeof(d.id) !== 'string') {
    sendError(ws, 'Malformed or missing id parameter.');
    return;
  }

  const user = getUserById(id);
  if(user === undefined) {
    sendError(ws, 'Unknown user.');
    return;
  }

  const remainingCoolDown = USER_RATE_LIMIT - (Date.now() - user.last_message);
  if(Date.now() - user.last_message < USER_RATE_LIMIT) {
    sendError(ws, `You are on message cooldown for ${remainingCoolDown} ms.`);
    return;
  }

  const content = d.content;
  if(d.content === undefined) {
    sendError(ws, 'Missing content parameter');
    return;
  }

  if(d.content.length > 1024) {
    sendError(ws, 'Message has too much character >1024.');
    return;
  }

  if(!VALID_REGEX.test(content)) {
    sendError(ws, `Message content is not valid regex: ${VALID_REGEX}`);
    return;
  }

  if(d.content === '' ||  d.content.replace(/\s/g, '') === '') {
    sendError(ws, 'Message content cannot be empty.');
    return;
  }

  user.last_message = Date.now();
  sendMessage(user.username, d.content);
}
