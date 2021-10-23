const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    description: 'Display information about VimeWorld player',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No VimeWorld player username specified.'));

        const info = await fetch(`https://api.vimeworld.ru/user/name/${args[0]}`, {
            method: 'GET'
        }).then(res => res.json());

        if (info.length === 0) return message.channel.send(await client.modules.errorEmbed(client, 'Can not find VimeWorld player.'));

        const playerId = info[0].id;
        const stats = await fetch(`https://api.vimeworld.ru/user/${playerId}/stats`, {
            method: 'GET'
        }).then(res => res.json());

        let lastSeenDate;
        if (stats.user.lastSeen !== -1) lastSeenDate = new Date(stats.user.lastSeen * 1000);
        let uptime = stats.user.playedSeconds;
        let days = Math.floor(uptime / 86400);
        uptime %= 86400;
        let hours = Math.floor(uptime / 3600);
        uptime %= 3600;
        let minutes = Math.floor(uptime / 60);
        let seconds = Math.floor(uptime % 60);

        const embed = new Discord.MessageEmbed()
            .setTitle(`:video_game: VimeWorld player ${stats.user.username}`)
            .setColor(client.config.embedColor)
            .addField('Level', stats.user.level)
            .addField('Rank', stats.user.rank)
            .addField('Played time', `${days}d ${hours}h ${minutes}m ${seconds}s`)
            .setTimestamp();

        if (stats.user.lastSeen !== -1) embed.addField('Last seen', lastSeenDate.toUTCString());
        if (stats.user.guild) {
            embed.addField('Guild', `**Name:** ${stats.user.guild.name}\n**Level:** ${stats.user.guild.level}`);
            embed.setThumbnail(stats.user.guild.avatar_url)
        }

        return message.channel.send(embed);
    }
}