import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Define model schema
const ImageSchema = new Schema({
    name: String,
    description: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    thumbnail: String,
    userId: String,
    groupIds: []
})

module.exports = mongoose.model('image', ImageSchema)