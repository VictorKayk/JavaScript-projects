import passport from 'passport';
import { StrategyOptions, Strategy } from 'passport-google-oauth20';

// Error
import AuthorizationError from '../modules/User/errors/AuthorizationError';

const options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/user/google/auth',
};

async function verify(accessToken, refreshToken, profile, done) {
  try {
    done(null, profile);
  } catch (e) {
    done(new AuthorizationError(), false);
  }
}

const strategy = new Strategy(options, verify);

passport.use(strategy);
