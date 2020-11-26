const express = require('express')
const Friendships = require('../models/Friendship.js')

var router = express.Router()

/**
 * FRIENDSHIPS SERVICE 
 */

/** FETCH ALL */
router.get("/",
  // passport.authenticate('/', { session: false }),
  (req, res) => {
  Friendships.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  })
})

/** POST A FRIENDSHIP */
router.post("/", 
  // passport.authenticate('/', { session: false }),
    (req, res) => {
    Friendships.create({
      user1: req.body.user1,
      user2: req.body.user2,
      createAt: new Date()
    }).then(friendships => res.json(friendships));
})

/** DELETE BY user1 AND user2 */
router.get("/:user1/:user2", (req, res) => {
  Friendships.deleteOne({ 'user1': req.params.user1, 'user2': req.params.user2 }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
})

/** SEARCH BY user1 AND user2 */
router.get("/:user1/:user2", (req, res) => {
  Friendships.findOne({ 'user1': req.params.user1, 'user2': req.params.user2 }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
})


/** SEARCH BY user */
router.get("/:user", (req, res) => {
  Friendships.find({ 'user1': req.params.user }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
})

module.exports = router