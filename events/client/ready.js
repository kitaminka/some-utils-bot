module.exports = async (client) => {
    console.log(`${client.user.username} started!`);
    await client.user.setActivity('@PingMe for information!', {
        type: 'PLAYING'
    });
}