import express from 'express'
import passport from 'passport'
import { handleError } from "../helpers.js"
import User from '../models/User.js'

var router = express.Router()

// Find all
router.get('/',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    try {

      User.find((err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      })

    } catch (error) {
      return handleError(res, err)
    }
  }
)

// Find one
router.get('/:id', function (req, res) {
  try {
    // Your code here
  } catch (error) {
    return handleError(res, err)
  }
})

// Create user
router.post('/', function (req, res) {
  try {
    // Your code here
  } catch (error) {
    return handleError(res, err)
  }
})

// Update user
router.put('/:id', function (req, res) {
  try {
    // Your code here
  } catch (error) {
    return handleError(res, err)
  }
})

// Delete user
router.delete('/:id', function (req, res) {
  try {
    // Your code here
  } catch (error) {
    return handleError(res, err)
  }
})

export default router