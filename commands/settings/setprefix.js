const Discord = require('discord.js');

module.exports = {
    name: 'setprefix',
    description: 'Set bot prefix.',
    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(await client.modules.errorEmbed(client, 'This command requires `ADMINISTRATOR` permission.'));
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No prefix specified.'));
        if (args[0].length < 1 || args[0].length > 5) return message.channel.send(await client.modules.errorEmbed(client, 'The prefix must be between 1 and 5 characters.'));
        if (args[0] === message.prefix) return message.channel.send(await client.modules.errorEmbed(client, 'This prefix has already set.'));

        const Server = client.models.Server;
        await Server.findOneAndUpdate({
            id: message.guild.id,
        }, {
            $set: {
                prefix: args[0],
            }
        });
        const embed = new Discord.MessageEmbed()
            .setTitle(':white_check_mark:Prefix changed')
            .setColor(client.config.embedColor)
            .setDescription(`Prefix changed to \`${args[0]}\``)
            .setTimestamp();
        return message.channel.send(embed);
    }
}