module.exports = async (client) => {
    console.log('Bot started!');
    await client.user.setActivity('@PingMe for information!', {
        type: 'PLAYING'
    });
}