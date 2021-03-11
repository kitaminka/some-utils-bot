const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Send embed message.',
    permission: 'ADMINISTRATOR',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No embed information specified.'));
        let embedInfo;
        try {
            embedInfo = JSON.parse(args.join(' '));
        } catch (err) {
            return message.channel.send(await client.modules.errorEmbed(client, 'Failed to get embed information.'));
        }
        const embed = new Discord.MessageEmbed();
        if (embedInfo.title !== undefined) embed.setTitle(embedInfo.title);
        if (embedInfo.url !== undefined) embed.setURL(embedInfo.url);
        if (embedInfo.author.name !== undefined && embedInfo.author.image !== undefined && embedInfo.author.url !== undefined) embed.setAuthor(embedInfo.author.name, embedInfo.author.image, embedInfo.author.url);
        if (embedInfo.description !== undefined) embed.setDescription(embedInfo.description);
        if (embedInfo.fields !== undefined) embed.addFields(embedInfo.fields);
        if (embedInfo.image !== undefined) embed.setImage(embedInfo.image);
        if (embedInfo.thumbnail !== undefined) embed.setThumbnail(embedInfo.thumbnail);
        if (embedInfo.color !== undefined) embed.setColor(embedInfo.color);
        if (embedInfo.footer.text !== undefined && embedInfo.footer.image !== undefined) embed.setFooter(embedInfo.footer.text, embedInfo.footer.image);
        if (embedInfo.timestamp !== undefined) embed.setTimestamp(embedInfo.timestamp);

        return message.channel.send(embed);
    }
}