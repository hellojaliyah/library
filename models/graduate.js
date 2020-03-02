const mongoose = require('mongoose')

const graduateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Graduate', graduateSchema)