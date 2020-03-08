const mongoose = require('mongoose')
const Book = require('./book')

const graduateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

graduateSchema.pre('remove', function(next) {
    Book.find({ graduate: this.id }, (err, books) => {
        if(err) {
            next(err)
        }else if (books.length > 0) {
            next(new Error('This graduate has books still'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Graduate', graduateSchema)