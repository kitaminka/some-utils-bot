module.exports = async (client, message) => {
    if (message.author.bot && message.type === 'dm') return;

    const Server = client.models.Server;

    Server.findOne({
        id: message.guild.id,
    }, (err, data) => {
        if (err) throw err;

        let prefix;
        if (data) prefix = data.prefix;
        else client.createGuild(client, message.guild);

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(client, message, args);
        } catch (error) {
            console.error(error);
        }
    });
}