const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'info',
    async execute(client, message, args) {
        const embed = new Discord.MessageEmbed();

        embed.addField('Пинг', client.ws.ping);

        return message.channel.send(embed);
    }
}