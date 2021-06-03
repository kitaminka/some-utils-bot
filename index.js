const Discord = require('discord.js');
const mongoose = require('mongoose');
const DiscordTogether = require('discord-together');

require('dotenv').config();

const client = new Discord.Client();
client.config = require('./config.json');
client.discordTogether = new DiscordTogether.DiscordTogether(client);

require('./handlers/models')(client);
require('./handlers/modules')(client);
require('./handlers/commands')(client);
require('./handlers/events')(client);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:  true,
    useFindAndModify: false,
});
client.login(process.env.TOKEN);