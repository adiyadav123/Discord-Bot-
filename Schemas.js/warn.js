const { model, Schema } = require('mongoose')

let warnSchema = new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
})

module.exports = model('warnSchemas', warnSchema);