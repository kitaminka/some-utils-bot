const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    prefix: {
        type: String,
        minlength: 1,
        maxlength: 5,
        required: true,
    },
    id: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Server', ServerSchema);