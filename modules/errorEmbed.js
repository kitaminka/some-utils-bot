const Discord = require('discord.js');

module.exports = (client, text) => {
    return new Discord.MessageEmbed()
        .setTitle(':x:Error')
        .setColor(client.config.embedColor)
        .setDescription(text)
        .setTimestamp()
}