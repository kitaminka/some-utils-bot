const fs = require('fs');

module.exports = (client) => {
    const moduleFiles = fs.readdirSync('./models').filter(file => file.endsWith('.js'));
    client.models = {};

    for (const file of moduleFiles) {
        const modelName = file.split('.')[0];
        client.models[modelName] = require(`../models/${file}`);
    }
}