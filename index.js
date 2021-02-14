const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

require('./handlers/commands')(client);
require('./handlers/events')(client);

client.login(process.env.TOKEN);
