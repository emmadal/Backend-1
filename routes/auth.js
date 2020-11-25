import express from 'express'
import passport from "passport"
import jwt from "jsonwebtoken"
import UserModel from '../models/User.js';

var router = express.Router()

router.get('/user',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    if (req.user && req.user._id) {
      const user = await UserModel.findOne({ _id: req.user._id });
      return res.json({
        user,
        message: 'Authenticated',
      });
    } else {
      res.status(401).send({ message: 'Unauthenticated' });
    }
  }
);

router.post('/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post('/login',
  async (req, res, next) => {
    passport.authenticate('login',
      async (err, user, info) => {
        try {

          console.log("err", info)

          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(user, { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email, phone: user.phone };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({
                message: 'Login successful',
                user: { id: user._id, ...user._doc, password: "", token }
              })
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

export default router