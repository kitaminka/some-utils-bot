module.exports = async (client, message) => {
    if (!message.content.startsWith('!') && message.author.bot && message.type === 'dm') return;
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        await client.commands.get(command).execute(client, message, args);
    } catch (error) {
        console.error(error);
    }
}