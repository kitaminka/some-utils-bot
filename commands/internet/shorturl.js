const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'shorturl',
    description: 'Return shorten URL.',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No URL specified.'));

        const params = new URLSearchParams();
        params.append('url', args[0]);

        let data;

        try {
            data = await fetch(`https://goolnk.com/api/v1/shorten`, {
                method: 'POST',
                body: params,
            }).then((res) => res.json());
        } catch (err) {
            message.channel.send(await client.modules.errorEmbed(client, 'An error has occurred.'));
            return console.error(err);
        }

        if (data.error) return message.channel.send(await client.modules.errorEmbed(client, 'Entered incorrect URL.'));

        const embed = new Discord.MessageEmbed()
            .setTitle('URL shortener')
            .setColor(client.config.embedColor)
            .addField('Initial url', args[0])
            .addField('Shorten url', data.result_url)
            .setTimestamp();

        return message.channel.send(embed);
    }
}