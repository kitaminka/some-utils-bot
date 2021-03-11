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
        if (embedInfo.title) embed.setTitle(embedInfo.title);
        if (embedInfo.url) embed.setURL(embedInfo.url);
        if (embedInfo.author.name !== undefined && embedInfo.author.image !== undefined && embedInfo.author.url !== undefined) embed.setAuthor(embedInfo.author.name, embedInfo.author.image, embedInfo.author.url);
        if (embedInfo.description) embed.setDescription(embedInfo.description);
        if (embedInfo.fields) embed.addFields(embedInfo.fields);
        if (embedInfo.image) embed.setImage(embedInfo.image);
        if (embedInfo.thumbnail) embed.setThumbnail(embedInfo.thumbnail);
        if (embedInfo.color) embed.setColor(embedInfo.color);
        if (embedInfo.footer.text !== undefined && embedInfo.footer.image !== undefined) embed.setFooter(embedInfo.footer.text, embedInfo.footer.image);
        if (embedInfo.timestamp === true) embed.setTimestamp();

        if (message.deletable) await message.delete();
        return message.channel.send(embed);
    }
}