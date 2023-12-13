import { createUser } from "../../logic/users.js";

export function onUserCreate(req, res) {
  const clientIp = req.connection.remoteAddress;
  const user = createUser();

  console.log(`[+] ${clientIp} create ${user.username} account.`);
  res.status(201).send({
    username: user.username,
    token: user.token
  });
}