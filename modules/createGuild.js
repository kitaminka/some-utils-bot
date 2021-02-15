module.exports = async (client, guild) => {
    const Server = client.models.Server;
    Server.findOne({
        id: guild.id,
    }, (err, data) => {
        if (err) throw err;

        if (!data) {
            new Server({
                prefix: client.config.defaultPrefix,
                id: guild.id,
            }).save();
        }
    })
}