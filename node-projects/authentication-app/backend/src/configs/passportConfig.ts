import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// Repository
import UserRepository from '../modules/User/repositories/implementations/UserRepository';

// Error
import AuthorizationError from '../modules/User/errors/AuthorizationError';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256']
}

async function verify({ sub: id }, done) {
  try {
    const user = await UserRepository.getUserById(Number(id));

    if (user) return done(null, user);
    return done(null, false);
  } catch (e) {
    done(new AuthorizationError(), false);
  }
}

const strategy = new Strategy(options, verify);

passport.use(strategy);
