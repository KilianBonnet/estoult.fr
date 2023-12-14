import { createUser, getUserByToken } from "../../logic/users.js";

export function onUserIdentify(req, res) {
  const clientIp = req.connection.remoteAddress;
  const token = req.headers.authorization;

  let user = getUserByToken(token);
  if (user === undefined) user = createUser();

  console.log(`[+] ${clientIp} is connected as ${user.username}.`);
  res.status(201).send({
    username: user.username,
    token: user.token
  });
}