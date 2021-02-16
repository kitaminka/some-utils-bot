module.exports = async (client, guild) => {
    await client.modules.createGuild(client, guild);
}