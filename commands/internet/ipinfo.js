const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    description: 'Display information about IP address.',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No IP address specified.'));
        let embed, ipInfo;

        ipInfo = await fetch(`http://ip-api.com/json/${args[0]}`, {
            method: 'GET',
        }).then((res) => res.json());

        if (ipInfo.status === 'success') {
            embed = new Discord.MessageEmbed()
                .setTitle(`<:ip_address:814069539645685820> IP address ${ipInfo.query}`)
                .setColor(client.config.embedColor)
                .addField('Country', ipInfo.country)
                .addField('City', ipInfo.city)
                .addField('Latitude', ipInfo.lat)
                .addField('Longitude', ipInfo.lon)
                .addField('ISP', ipInfo.isp)
                .setImage(`https://static-maps.yandex.ru/1.x/?ll=${ipInfo.lon},${ipInfo.lat}&l=map&z=14&lang=en_GB`)
                .setTimestamp();
        } else {
            embed = await client.modules.errorEmbed(client, 'Entered incorrect IP address.')
        }
        return message.channel.send(embed);
    }
}
