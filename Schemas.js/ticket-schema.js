const { model, Schema } = require('mongoose');

const ticketSchema = new Schema({
    Guild: String,
    Channel: String,
    Ticket: String,
    User: String
})
module.exports = model('ticketSchema', ticketSchema);