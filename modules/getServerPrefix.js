module.exports = async (client, guild) => {
    const Server = client.models.Server;
    try {
        const data = await Server.findOne({
            id: guild.id,
        });
        if (!data) {
            await client.modules.createGuild(client, guild);
            return client.config.defaultPrefix;
        } else {
            return data.prefix;
        }
    } catch (err) {
        console.error(err);
    }
}