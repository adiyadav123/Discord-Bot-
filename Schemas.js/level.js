const { model, Schema } = require('mongoose')

let levelSchema = new Schema({
    Guild: String,
    User: String,
    Level: Number,
    XP: Number
})

module.exports = model('levelSchema', levelSchema);