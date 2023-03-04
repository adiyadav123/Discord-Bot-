const { model, Schema } = require('mongoose');

const rollSchema = new Schema({
    Guild: String,
    User: String,
    Channel: String,
    Times: Number
});

module.exports = model('rollSchema', rollSchema);