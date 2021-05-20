const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'random',
    description: 'Return random number.',
    async execute(client, message, args) {
        if (!args[0] || !args[1]) return message.channel.send(await client.modules.errorEmbed(client, 'The smallest or biggest number is not specified.'));
        if (isNaN(args[0]) || isNaN(args[1]) || args[0].includes('.') || args[1].includes('.')) return message.channel.send(await client.modules.errorEmbed(client, 'The smallest or biggest number must be an integer.'));
        if (args[0] === args[1]) return message.channel.send(await client.modules.errorEmbed(client, 'The first number cannot be equal to the second number.'));
        if (args[0] > args[1]) return message.channel.send(await client.modules.errorEmbed(client, 'The first number cannot be smaller than the second number.'));

        const number = await fetch(`https://www.random.org/integers/?num=1&min=${args[0]}&max=${args[1]}&base=10&col=1&format=plain&rnd=new`, {
            method: 'GET'
        }).then(res => res.text());

        const embed = new Discord.MessageEmbed()
            .setTitle(`:game_die: Random number from ${args[0]} to ${args[1]}`)
            .setColor(client.config.embedColor)
            .addField('Result', number)
            .setTimestamp();

        return message.channel.send(embed);
    }
}