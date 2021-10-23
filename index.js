const Discord = require('discord.js');
const mongoose = require('mongoose');
const { DiscordTogether } = require('discord-together');

require('dotenv').config();

const client = new Discord.Client();
client.config = require('./config.json');
client.discordTogether = new DiscordTogether(client);

require('./handlers/models')(client);
require('./handlers/modules')(client);
require('./handlers/commands')(client);
require('./handlers/events')(client);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:  true
});
client.login(process.env.TOKEN);