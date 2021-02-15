const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Discord.Client();
client.models = {};
client.models.Server = require('./models/server');
client.config = require('./config.json');
client.errorEmbed = require('./modules/errorEmbed');
client.createGuild = require('./modules/createGuild');

require('./handlers/commands')(client);
require('./handlers/events')(client);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:  true,
    w: 'majority',
    useFindAndModify: false,
});
client.login(process.env.TOKEN);