module.exports = async (client, guild) => {
    const Server = client.models.Server;
    try {
        await Server.findOneAndDelete({
            id: guild.id,
        });
    } catch (err) {
        console.error(err);
    }
}