import passport from 'passport';

export const googleLoginAuth = passport.authenticate('google', { session: false, scope: ['profile'] });
export const googleLoginAuthCb = passport.authenticate('google', { session: false });
