const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    prefix: {
        type: String,
        minlength: 1,
        maxlength: 5,
        required: true,
    },
    guild: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Prefix', PrefixSchema);