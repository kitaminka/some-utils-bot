const Discord = require('discord.js');

module.exports = {
    name: 'setprefix',
    category: 'settings',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(client.errorEmbed(client, 'No prefix specified.'));
        if (args[0].length < 1 || args[0].length > 5) return message.channel.send(client.errorEmbed(client, 'The prefix must be between 1 and 5 characters.'))
        client.models.Server.findOneAndUpdate({
            id: message.guild.id,
        }, {
            $set: {
                prefix: args[0],
            }
        },(err) => {
            if (err) {
                message.channel.send(client.errorEmbed(client, 'An error has occurred.'));
                return console.error(err);
            }
            const embed = new Discord.MessageEmbed()
                .setTitle(':white_check_mark:Prefix changed')
                .setColor(client.config.embedColor)
                .setDescription(`Prefix changed to \`${args[0]}\``)
                .setTimestamp();
            message.channel.send(embed);
        });
    }
}