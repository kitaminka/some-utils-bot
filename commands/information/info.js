const Discord = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Display bot information.',
    async execute(client, message) {
        const embed = new Discord.MessageEmbed()
            .setTitle(':information_source:SomeUtilsBot information')
            .setColor(client.config.embedColor)
            .setDescription(`It is bot with a set of utilities.\nCurrent server bot prefix: \`${message.prefix}\`. Use \`${message.prefix}help\` to see all bot command categories.`)
            .addField('Links', '[Add bot to server](https://discord.com/oauth2/authorize?client_id=810576719903719424&scope=bot&permissions=1849163457)\n[Support server](https://discord.gg/fdW283BpTY)\n[GitHub repository](https://github.com/Kitaminka/SomeUtilsBot)')
            .setTimestamp();

        return message.channel.send(embed);
    }
}