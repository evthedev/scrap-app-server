import express from 'express'
import passport from 'passport'
const router = express.Router()

// TODO: Passport stuff

// Image model
const Image = require('../../models/Image')
// @route   GET api/images/test
// @desc    Tests image route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Images Works'}))

// @route   GET api/images
// @desc    Get images
// @access  Public
router.get('/', (req, res) => {
    Image.find()
      .sort({ dateCreated: -1 })
      .then(images => res.json(images))
      .catch(err => res.status(404).json({ noimagesfound: 'No images found' }))
  })

// @route   POST api/images
// @desc    Create image
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const newImage = new Image({
        name: req.body.name,
        description: req.body.description,
        userId: req.user.id,
        // TODO: thumbnail

      })
  
      newImage.save().then(image => res.json({
        message: 'Successfully posted',
        image
      }))
    }
)

// @route   PUT api/images/:id
// @desc    Update image
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    
    // Get request params
    const imageId = req.params.id
    
    // Get request body
    const { name, description, groupId } = req.body

    Image.findById(imageId, (err, image) => {
      if (err) {
        res.status(404).json({ message: 'Image not found' })
      } else {
        // Check if groupId is set and if image groups does not already include it
        if (groupId && !image.groupIds.includes(groupId)) {
          image.groupIds.push(groupId)
        }
        if (name) image.name = name
        if (description) image.description = description

        image.save().then(updatedImage => res.json({
          message: 'Image successfully updated',
          image: updatedImage
        }))

      }
    })
  }
)

// @route   DELETE api/images/:id
// @desc    Delete image
// @access  Private
router.delete(
  '/:id',
  // TODO: Auth
  (req, res) => {
      Image.findById(req.params.id)
      .then(image => {
        // TODO: Check for image owner
        // if (image.user.toString() !== req.user.id) {
        //   return res
        //     .status(401)
        //     .json({ notauthorized: 'User not authorized' })
        // }

        // Delete
        image.remove().then(() => res.json({ message: 'Successfully deleted' }))
      })
      .catch(err => res.status(404).json({ message: 'Image not found' }))
  }
)

module.exports = router
