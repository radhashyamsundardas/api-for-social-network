const {Schema, model} = require('mongoose');
const thotschema = require('./thought');

const usrSchema = new Schema ({
    username: {
        type: String,
        unique: [true, 'username in use'],
        required: [true, 'userme cannot be empty'],
        trim: true
    },
})

module.exports = user;