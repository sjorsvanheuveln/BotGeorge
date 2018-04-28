const express = require('express');
const RobotUser = require('./RobotUser');
const LegalMovePlayer = require('./LegalMovePlayer');

const PORT = process.env.PORT || 5000;
const token = 'ASF3dMJEPDGC1hVD';
const player = new LegalMovePlayer();
const robot = new RobotUser(token, player);

robot.start();
// heroku wakeup server (not necessary otherwise)

express()
  .get('/', (req, res) => res.send(`<h1>Challenge <a href="https://lichess.org/@/${robot.account.data.username}">${robot.account.data.username}</a> on lichess</h1>`))
  .listen(PORT, () => console.log(`Keep alive server listening on ${PORT}`));
