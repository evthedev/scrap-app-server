import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Define model schema
const ProjectSchema = new Schema({
    name: String,
    description: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    thumbnail: String,
    userId: String
})

module.exports = mongoose.model('project', ProjectSchema)