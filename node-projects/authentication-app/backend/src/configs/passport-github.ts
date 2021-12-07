import passport from 'passport';
import { Strategy, StrategyOptions } from 'passport-github2';

// Error
import AuthorizationError from '../modules/User/errors/AuthorizationError';

const options: StrategyOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/user/github/auth',
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
