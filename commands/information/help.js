const Discord = require('discord.js');

module.exports = {
    description: 'Display information about commands.',
    async execute(client, message, args) {
        let embed = new Discord.MessageEmbed();
        if (!args[0]) {
            embed.setTitle(':dividers:Command categories')
                .setDescription(`To know more about category or command, use \`${message.prefix}help [category or command name]\`.`)
                .setColor(client.config.embedColor)
                .setTimestamp();
            for (const category of client.commandCategories) {
                let commands = [];
                for (const [command, commandInfo] of client.commands.entries()) {
                    if (commandInfo.category === category) {
                        commands.push(`\`${message.prefix}${command}\``);
                    }
                }
                embed.addField(`${category.charAt(0).toUpperCase() + category.slice(1)} (${message.prefix}help ${category})`, commands.join(' '));
            }
        } else {
            args[0] = args[0].toLowerCase();
            if (client.commandCategories.includes(args[0])) {
                embed.setTitle(`:dividers:${args[0].charAt(0).toUpperCase() + args[0].slice(1)} commands`)
                    .setDescription(`To know more about category or command, use \`${message.prefix}help [category or command name]\`.`)
                    .setColor(client.config.embedColor)
                    .setTimestamp();
                let commands = [];
                for (const [command, commandInfo] of client.commands.entries()) {
                    if (commandInfo.category === args[0]) {
                        commands.push(command);
                    }
                }
                for (const command of commands) {
                    const commandInfo = client.commands.get(command);
                    embed.addField(message.prefix + command, commandInfo.description);
                }
            } else if (client.commands.has(args[0])) {
                const commandInfo = client.commands.get(args[0])
                embed.setTitle(`:dividers: Command ${message.prefix + args[0]}`)
                    .setDescription(`To know more about category or command, use \`${message.prefix}help [category or command name]\`.`)
                    .setColor(client.config.embedColor)
                    .setTimestamp()
                    .addField('Category', commandInfo.category.charAt(0).toUpperCase() + commandInfo.category.slice(1))
                    .addField('Description', commandInfo.description);
            } else {
                embed = await client.modules.errorEmbed(client, `Entered incorrect category or command name. Use \`${message.prefix}help\` to get all command categories.`);
            }
        }
        return message.channel.send(embed);
    }
}