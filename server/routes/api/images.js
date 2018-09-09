import express from 'express'
const router = express.Router()

// TODO: Passport stuff

// Post model
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
      .catch(err => res.status(404).json({ noimagesfound: 'No images found' }));
  });

// @route   POST api/images
// @desc    Create image
// @access  Private
router.post(
    '/',
    // TODO: Auth
    (req, res) => {
  
      const newImage = new Image({
        name: req.body.name,
        description: req.body.description,
        // TODO: thumbnail

      });
  
      newImage.save().then(image => res.json(image));
    }
);
  
module.exports = router
