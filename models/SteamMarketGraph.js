const mongoose = require('mongoose');

const SteamMarketGraphSchema = new mongoose.Schema({
    channel: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('SteamMarketGraph', SteamMarketGraphSchema);