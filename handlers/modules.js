const fs = require('fs');

module.exports = (client) => {
    const moduleFiles = fs.readdirSync('./modules').filter(file => file.endsWith('.js'));
    client.modules = {};

    for (const file of moduleFiles) {
        const moduleName = file.split('.')[0];
        client.modules[moduleName] = require(`../modules/${file}`);
    }
}