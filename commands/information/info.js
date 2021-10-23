const Discord = require('discord.js');

module.exports = {
    description: 'Display bot information.',
    async execute(client, message) {
        let uptime = (client.uptime / 1000);
        let days = Math.floor(uptime / 86400);
        uptime %= 86400;
        let hours = Math.floor(uptime / 3600);
        uptime %= 3600;
        let minutes = Math.floor(uptime / 60);
        let seconds = Math.floor(uptime % 60);
        const embed = new Discord.MessageEmbed()
            .setTitle(':information_source: SomeUtilsBot information')
            .setColor(client.config.embedColor)
            .setDescription(`It is bot with a set of utilities.\nCurrent server bot prefix: \`${message.prefix}\`. Use \`${message.prefix}help\` to see all bot command categories.`)
            .addField('Uptime', `${days}d ${hours}h ${minutes}m ${seconds}s`)
            .addField('Server count', client.guilds.cache.size)
            .addField('Developer', 'Kitam#5450')
            .addField('Node.js version', process.version)
            .addField('WebSocket ping', client.ws.ping)
            .addField('Links', '[GitHub repository](https://github.com/Kitaminka/SomeUtilsBot)')
            .setTimestamp();

        return message.channel.send(embed);
    }
}