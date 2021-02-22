const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'mcserver',
    description: 'Display information about Minecraft server',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No Minecraft server IP address specified.'));

        const serverInfo = await fetch(`https://eu.mc-api.net/v3/server/ping/${args[0]}`, {
            method: 'GET',
        }).then((res) => res.json());

        if (!serverInfo.online) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to get Minecraft server information. The wrong IP address may be entered or the server is down.'));

        const embed = new Discord.MessageEmbed()
            .setTitle(`Minecraft server information ${args[0]}`)
            .setColor(client.config.embedColor)
            .setThumbnail(serverInfo.favicon)
            .addField('Players', `${serverInfo.players.online}/${serverInfo.players.max}`)
            .addField('Version', serverInfo.version.name)
            .setTimestamp();

        let description = '';
        if (serverInfo.description.extra) for (const extra of serverInfo.description.extra) description += extra.text;
        else description = serverInfo.description;

        embed.setDescription(description);
        return message.channel.send(embed);
    }
}