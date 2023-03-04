const { model, Schema } = require('mongoose');

const ecoSchema = new Schema({
    Guild: String,
    User: String,
    Wallet: Number,
    Bank: Number
})

module.exports = model('ecoSchema', ecoSchema);