const { model, Schema } = require("mongoose");

const antiswear = new Schema({
    _id: { type: String, require: true },
    logs: { type: Boolean, default: false }
})

module.exports = model('antiswear', antiswear);