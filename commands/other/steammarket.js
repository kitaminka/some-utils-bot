const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    description: 'Display information about item from Steam Community Market',
    async execute(client, message, args) {
        try {
            if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No Steam Community Market item name specified.'));
            const itemInfo = await fetch(`https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&norender=1&count=1&query=${args.join(' ')}`, {
                method: 'GET',
                headers: {
                    cookie: process.env.STEAM_LOGIN
                }
            }).then(res => res.json());
            if (!itemInfo.success) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to get Community Market item information.'));
            if (!itemInfo.results[0]) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to find Community Market item.'));
            const embed = new Discord.MessageEmbed()
                .setTitle(`:gun: ${itemInfo.results[0].name}`)
                .setAuthor(itemInfo.results[0].app_name, itemInfo.results[0].app_icon)
                .setColor(client.config.embedColor)
                .setThumbnail(`https://community.cloudflare.steamstatic.com/economy/image/${itemInfo.results[0].asset_description.icon_url}`)
                .addField('Price', itemInfo.results[0].sell_price_text)
                .setTimestamp();
            if (itemInfo.results[0].asset_description.type !== '') embed.addField('Type', itemInfo.results[0].asset_description.type);
            return message.channel.send(embed);
        } catch {
            return message.channel.send(await client.modules.errorEmbed(client, 'Failed to get Community Market item information.'));
        }
    }
}