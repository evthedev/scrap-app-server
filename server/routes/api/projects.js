import express from 'express'
import passport from 'passport'
const router = express.Router()

// TODO: Passport stuff

// Project model
const Project = require('../../models/Project')
// @route   GET api/projects/test
// @desc    Tests project route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Projects Works'}))

// @route   GET api/projects
// @desc    Get projects
// @access  Public
router.get('/', (req, res) => {
    Project.find()
      .sort({ dateCreated: -1 })
      .then(projects => res.json(projects))
      .catch(err => res.status(404).json({ error: 'No projects found' }))
  })

// @route   POST api/projects
// @desc    Create project
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        userId: req.user.id
        // TODO: thumbnail

      })
  
      newProject.save().then(project => res.json({
        message: 'Successfully posted',
        project
      }))
    }
)

// @route   GET api/projects/:id
// @desc    Get project
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const projectId = req.params.id
    Project.findById(projectId, (err, project) => {
      if (err) {
        res.status(404).json({error: 'Project not found'})
      } else {
        res.json({
          message: 'Project found',
          project          
        })
      }
    })

  }
)

// @route   DELETE api/projects/:id
// @desc    Delete project
// @access  Private
router.delete(
  '/:id',
  // TODO: Auth
  (req, res) => {
      Project.findById(req.params.id)
      .then(project => {
        // TODO: Check for project owner
        // if (project.user.toString() !== req.user.id) {
        //   return res
        //     .status(401)
        //     .json({ notauthorized: 'User not authorized' })
        // }

        // Delete
        project.remove().then(() => res.json({ message: 'Successfully deleted' }))
      })
      .catch(err => res.status(404).json({ error: 'Project not found' }))
  }
)

module.exports = router
