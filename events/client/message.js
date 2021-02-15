module.exports = async (client, message) => {
    if (message.author.bot && message.type === 'dm') return;

    client.Prefix.findOne({
        guild: message.guild.id,
    }, async (err, data) => {
        if (err) throw err;

        let prefix;
        if (data) {
            prefix = data.prefix;
        } else {
            const Prefix = new client.Prefix({
                prefix: '!',
                guild: message.guild.id,
            });
            await Prefix.save();
            prefix = '!';
        }

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
            await client.commands.get(command).execute(client, message, args);
        } catch (error) {
            console.error(error);
        }
    });
}