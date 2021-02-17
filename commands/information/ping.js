const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'information',
    description: 'Display bot ping.',
    async execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle(':ping_pong:Pong!')
            .setColor(client.config.embedColor)
            .addField('Ping', `${client.ws.ping}ms`)
            .setTimestamp();

        return message.channel.send(embed);
    }
}