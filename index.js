const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Discord.Client();
client.config = require('./config.json');
client.errorEmbed = require('./modules/errorEmbed');
client.createGuild = require('./modules/createGuild');

require('./handlers/models')(client);
require('./handlers/commands')(client);
require('./handlers/events')(client);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:  true,
    useFindAndModify: false,
});
client.login(process.env.TOKEN);