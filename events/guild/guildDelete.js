module.exports = async (client, guild) => {
    await client.modules.deleteGuild(client, guild);
}