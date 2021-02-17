const fs = require('fs');

module.exports = async (client) => {
    const eventDirs = fs.readdirSync('./events');

    for (const dir of eventDirs) {
        const eventFiles = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`../events/${dir}/${file}`);
            const eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client));
        }
    }
}