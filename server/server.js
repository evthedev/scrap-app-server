import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'

// import models and routes
import images from './routes/api/images'

const app = express()

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

// DB Config
const db = require('../config/keys').mongoURI

// TODO Passport middleware stuff


// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Enable cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, X-Requested-With")
    next()
})

// Use Routes
app.use('/api/images', images)


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