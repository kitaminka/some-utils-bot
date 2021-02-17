const fs = require('fs');

module.exports = async (client) => {
    const modelFiles = fs.readdirSync('./models').filter(file => file.endsWith('.js'));
    client.models = {};

    for (const file of modelFiles) {
        const modelName = file.split('.')[0];
        client.models[modelName] = require(`../models/${file}`);
    }
}