const passport = require('passport');
const passportLocal = require('passport-local');
const UserModel = require('../models/User.js');
const passportJwt = require('passport-jwt');

var JWTstrategy = passportJwt.Strategy;
var ExtractJWT = passportJwt.ExtractJwt;

var localStrategy = passportLocal.Strategy

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use('signup',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {

        const usernameData = username.includes("@") ? { email: username } : { phone: username }

        const userExists = await UserModel.findOne(usernameData);

        if (userExists) {
          return done(null, false, { message: 'User already exist' });
        }

        const userData = req.body

        const user = await UserModel.create({ ...userData, ...usernameData, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use('login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne(
          username.includes("@") ? { email: username } : { phone: username }
        );

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);