module.exports = async (client, message) => {
    message.prefix = await client.modules.getServerPrefix(client, message.guild);
    if (message.author.bot && message.type === 'dm' && !message.content.startsWith(message.prefix)) return;

    const args = message.content.slice(message.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    const commandFile =client.commands.get(command)

    if (commandFile.permissions) {
        if (!message.member.hasPermission(commandFile.permission)) {
            return message.channel.send(await client.modules.errorEmbed(client, `This command requires \`${commandFile.permission}\` permission.`));
        }
    }

    try {
        client.commands.get(command).execute(client, message, args);
    } catch (err) {
        await message.channel.send(await client.modules.errorEmbed(client, 'An error has occurred.'));
        return console.error(err);
    }
}