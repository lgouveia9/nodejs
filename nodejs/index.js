const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');

const rendertron = require('rendertron-middleware');
const BOTS = rendertron.botUserAgents.concat('googlebot');
const BOT_UA_PATTERN = new RegExp(BOTS.join('|'), 'i');

app.use(bodyParser.json());

app.set('pasta', __dirname + "/public/")

app.set('view engine', 'html')

app.use(rendertron.makeMiddleware({
  proxyUrl: 'http://localhost:3000/render',
  userAgentPattern: BOT_UA_PATTERN
}));

app.use(require('./render.js'));

app.use(require('./routes'));

app.listen(3800);