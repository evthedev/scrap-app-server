import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'

// DB Config
import { mongoURI as db } from './config/keys'

// import models and routes
import images from './routes/api/images'
import users from './routes/api/users'
import projects from './routes/api/projects'

const app = express()

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))



// const db = require('../config/keys').mongoURI

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Enable cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, X-Requested-With, Authorization") // added authorization to make it work
    // res.header("Access-Control-Allow-Credentials", "true") 
    // res.header("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, X-Requested-With")


    next()
})

// Use Routes
app.use('/api/images', images)
app.use('/api/users', users)
app.use('/api/projects', projects)


// TODO: Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static(__dirname + 'client/build'))
  
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     })
// }

// Declare port number
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`));

// Export for testing
module.exports = app