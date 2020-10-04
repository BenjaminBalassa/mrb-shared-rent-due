const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CleaningOrder = new Schema({
    user: Object,
    start: Date,
    end: Date,
    week: Number,
    active: Boolean
})
module.exports = mongoose.model('cleaningorder', CleaningOrder)