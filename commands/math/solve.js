const Discord = require('discord.js');

module.exports = {
    description: 'Solve math example.',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'The math example is not specified.'));
        const example = args.join(' ');
        if (/[a-z]/.test(example) || /[,'"`$@#?]/.test(example)) return message.channel.send(await client.modules.errorEmbed(client, 'The math example is invalid.'));
        if (example.length > 50) return message.channel.send(await client.modules.errorEmbed(client, 'The math example must be shorter than 50 symbols.'));
        try {
            const result = eval(example);
            const embed = new Discord.MessageEmbed()
                .setTitle(`:heavy_plus_sign: Result of math example`)
                .setColor(client.config.embedColor)
                .addField('Math example', example)
                .addField('Result', result)
                .setTimestamp();
            return message.channel.send(embed);
        } catch {
            return message.channel.send(await client.modules.errorEmbed(client, 'The math example is invalid.'));
        }
    }
}