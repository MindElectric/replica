const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    habilidad: {
        type: String,
        required: true
    },

    modalidad: {
        type: String,
        required: true
    },

    area: {
        type: String,
        required: true
    },

    cope: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);