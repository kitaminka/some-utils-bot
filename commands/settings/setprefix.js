const Discord = require('discord.js');

module.exports = {
    name: 'setprefix',
    category: 'settings',
    async execute(client, message, args) {
        client.Prefix.findOneAndUpdate({
            guild: message.guild.id,
        }, {
            $set: {
                prefix: args[0],
            }
        },(err) => {
            if (err) console.error(err);

        });
    }
}