const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

require('./handlers/commands')(client);
require('./handlers/events')(client);

client.login('ODEwNTc2NzE5OTAzNzE5NDI0.YClqZQ.JbwFN6qWb2ArSlu8k4Z4jSfRUbs');
