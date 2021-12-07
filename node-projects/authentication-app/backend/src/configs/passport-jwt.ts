import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

// Repository
import UserRepository from '../modules/User/repositories/implementations/UserRepository';

// Error
import AuthorizationError from '../modules/User/errors/AuthorizationError';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'],
};

async function verify({ sub: userID }, done) {
  try {
    const { id, role, permissions } = await UserRepository.getUserById(Number(userID));

    const newPermissions = permissions.map((permission) => permission.name);

    const user = {
      id,
      role,
      permissions: newPermissions,
    };

    if (user) return done(null, user);
    return done(null, false);
  } catch (e) {
    done(new AuthorizationError(), false);
  }
}

const strategy = new Strategy(options, verify);

passport.use(strategy);
