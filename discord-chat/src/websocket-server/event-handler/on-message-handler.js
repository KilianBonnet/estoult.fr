import { sendMessage } from "../../logic/messages.js";
import { isServerReady } from "../../logic/server-state.js";
import { USER_RATE_LIMIT, getUserByToken } from "../../logic/users.js";

const VALID_REGEX = /^[a-zA-Z0-9àáâäèéêëìíîïòóôöùúûüç.'"()=+&\[\],!?; ]+$/;

export function onMessage(req, res) {
  const token = req.headers.authorization;
  if (!token || typeof token !== 'string') {
    res.status(403).send('Missing authorization token.');
    return;
  }

  const user = getUserByToken(token);
  if(user === undefined) {
    res.status(403).send('Invalid token.');
    return;
  }

  const remainingCoolDown = USER_RATE_LIMIT - (Date.now() - user.last_message);
  if(Date.now() - user.last_message < USER_RATE_LIMIT) {
    res.status(400).send(`You are on message cooldown for ${remainingCoolDown} ms.`);
    return;
  }

  const content = req.body.content;
  if(content === undefined || typeof(content) !== 'string') {
    res.status(400).send('Malformed or missing content parameter.');
    return;
  }

  if(content.length > 1024) {
    res.status(400).send('Message has too much character >1024.');
    return;
  }

  if(!VALID_REGEX.test(content)) {
    res.status(400).send(`Message content is not valid regex: ${VALID_REGEX}`);
    return;
  }

  if(content === '' ||  content.replace(/\s/g, '') === '') {
    res.status(400).send('Message content cannot be empty.');
    return;
  }

  user.last_message = Date.now();

  if(!isServerReady()) {
    res.status(500).send('Server is not ready.');
    return;
  }

  sendMessage(user.username, content)
    .then((senderResponse) => res.status(senderResponse.status).send(senderResponse.content));
}
