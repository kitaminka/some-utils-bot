const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (client) => {
    client.commandCategories = [];
    client.commands = new Discord.Collection();

    const commandDirs = fs.readdirSync('./commands');

    for (const dir of commandDirs) {
        const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);
            command.category = dir;

            if (!client.commandCategories.includes(command.category)) client.commandCategories.push(command.category);

            client.commands.set(command.name, command);
        }
    }
}