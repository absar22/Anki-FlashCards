
const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true,
        trim: true
    },
    answer:{
        type: String,
        required: true,
        trim: true
    },
    tag:{
        type: String,
        default: 'general'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Card', CardSchema)