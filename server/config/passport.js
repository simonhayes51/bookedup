import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/index.js';

/**
 * Google OAuth Strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({
          where: {
            authProvider: 'google',
            providerId: profile.id
          }
        });

        if (!user) {
          // Create new user
          user = await User.create({
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            avatar: profile.photos[0]?.value,
            authProvider: 'google',
            providerId: profile.id,
            isVerified: true, // Email is verified by Google
            role: 'client'
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

/**
 * Facebook OAuth Strategy
 */
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({
          where: {
            authProvider: 'facebook',
            providerId: profile.id
          }
        });

        if (!user) {
          // Create new user
          user = await User.create({
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            avatar: profile.photos[0]?.value,
            authProvider: 'facebook',
            providerId: profile.id,
            isVerified: true,
            role: 'client'
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
