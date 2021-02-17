module.exports = async (client, message) => {
    message.prefix = await client.modules.getServerPrefix(client, message.guild);
    if (message.author.bot && message.type === 'dm' && !message.content.startsWith(message.prefix)) return;

    const args = message.content.slice(message.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(client, message, args);
    } catch (err) {
        console.error(err);
    }
}