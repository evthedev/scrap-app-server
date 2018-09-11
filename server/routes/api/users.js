import express from 'express'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import passport from 'passport'

// DB Config
import keys from '../../../config/keys'

const router = express.Router()

// User model
const User = require('../../models/User')

// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'Users Works'
}))

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({ dateCreated: -1 })
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ error: 'No users found' }))
})

// @route   GET api/users/:id
// @desc    Get a specific user
// @access  Public
router.get('/:id',
    (req, res) => {
        User.findById(req.params.id)
            .then(user => res.json({ user }))
        .catch(err => res.status(404).json({ usernotfound: 'No user found' }))
    }
)

// @route   POST api/users/signup
// @desc    Register user
// @access  Public
router.post('/signup', (req, res) => {

    // TODO validation here

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                error: 'Email already exists'
            })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            })

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => {
                            // delete password
                            user.password = undefined
                            res.json({
                                message: 'Successfully posted',
                                user
                            })
                        })
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    // TODO validation

    const email = req.body.email
    const password = req.body.password

    // Find user by email
    User.findOne({
        email
    }).then(user => {
        // Check for user
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                } // Create JWT Payload

                // Sign Token
                jsonwebtoken.sign(
                    payload,
                    keys.secretOrKey, {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        console.log('token: ', token);
                        console.log('err: ', err);
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    }
                )
            } else {
                errors.password = 'Password incorrect'
                return res.status(400).json(errors)
            }
        })
    })
})

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Public
router.delete(
    '/:id',
    (req, res) => {
        User.findById(req.params.id)
            .then(user => {
                // Delete
                user.remove().then(() => res.json({ success: true }))
            })
        .catch(err => res.status(404).json({ usernotfound: 'No user found' }))
    }
)

module.exports = router