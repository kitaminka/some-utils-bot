const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Discord.Client();
client.Prefix = require('./models/prefix');

require('./handlers/commands')(client);
require('./handlers/events')(client);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:  true,
    w: 'majority',
});
client.login(process.env.TOKEN);
